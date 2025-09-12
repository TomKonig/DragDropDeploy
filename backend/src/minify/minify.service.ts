import * as fs from "fs";
import * as path from "path";

import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

// Lightweight dynamic imports to avoid adding heavy deps until used.
// Placeholder minifiers (simple regex shrinks) to avoid external libs at this stage; can be swapped later.
function minifyJs(src: string): string {
  // Remove // comments and /* */ blocks, collapse multiple spaces
  return src
    .replace(/\/\/[^\n]*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s{2,}/g, " ");
}
function minifyCss(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s{2,}/g, " ");
}
function minifyHtml(src: string): string {
  return src.replace(/>\s+</g, "><").replace(/\s{2,}/g, " ");
}

@Injectable()
export class MinifyService {
  // FORCE_MINIFY evaluation strategy:
  // - In test environment we re-read process.env each call so tests can mutate FORCE_MINIFY between invocations without rebuilding DI graph.
  // - In non-test environments we cache the value at construction time for minor perf gain & to avoid surprises from late mutation.
  private readonly cachedForce =
    process.env.NODE_ENV === "test" ? undefined : process.env.FORCE_MINIFY;
  private get force() {
    return this.cachedForce !== undefined
      ? this.cachedForce
      : process.env.FORCE_MINIFY;
  }
  private artifactsRoot = process.env.ARTIFACTS_DIR || "./artifacts";
  constructor(private readonly prisma: PrismaService) {}

  async maybeMinifyProject(
    projectId: string,
    log: (line: string) => void,
  ): Promise<void> {
    const projectDir = path.join(this.artifactsRoot, projectId);
    if (!fs.existsSync(projectDir)) {
      log(`minify: project artifacts not found path=${projectDir}`);
      return;
    }
    if (this.force === "0") {
      log("minify: globally disabled by FORCE_MINIFY=0");
      return;
    }
    let optOut = false;
    try {
      const ps = await this.prisma.projectSetting.findUnique({
        where: { projectId },
      });
      optOut = !!ps?.optOutMinify;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "unknown";
      log(`minify: warning could not load project setting err=${msg}`);
    }
    if (optOut && this.force !== "1") {
      log("minify: skipped (project optOutMinify=true)");
      return;
    }
    log("minify: starting pass");
    let processed = 0;
    let skipped = 0;
    let errors = 0;
    const exts = [".js", ".css", ".html", ".htm"];
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir)) {
        const full = path.join(dir, entry);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
          walk(full);
          continue;
        }
        const ext = path.extname(entry).toLowerCase();
        if (!exts.includes(ext)) continue;
        if (/\.min\.(js|css)$/.test(entry)) {
          skipped++;
          continue;
        }
        try {
          const original = fs.readFileSync(full, "utf8");
          const before = original.length;
          let out = original;
          if (ext === ".js") out = minifyJs(original);
          else if (ext === ".css") out = minifyCss(original);
          else if (ext === ".html" || ext === ".htm")
            out = minifyHtml(original);
          if (out.length < before) {
            fs.writeFileSync(full, out, "utf8");
            processed++;
          } else {
            skipped++;
          }
        } catch (e) {
          errors++;
          const msg = e instanceof Error ? e.message : "unknown";
          log(`minify: error file=${full} err=${msg}`);
        }
      }
    };
    walk(projectDir);
    log(
      `minify: complete processed=${processed} skipped=${skipped} errors=${errors}`,
    );
  }
}
