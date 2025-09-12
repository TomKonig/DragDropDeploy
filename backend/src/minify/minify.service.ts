import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

// Lightweight dynamic imports to avoid adding heavy deps until used.
// Placeholder minifiers (simple regex shrinks) to avoid external libs at this stage; can be swapped later.
function minifyJs(src: string): string {
  // Remove // comments and /* */ blocks, collapse multiple spaces
  return src
    .replace(/\/\/[^\n]*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s{2,}/g, ' ');
}
function minifyCss(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s{2,}/g, ' ');
}
function minifyHtml(src: string): string {
  return src
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ');
}

@Injectable()
export class MinifyService {
  private force = process.env.FORCE_MINIFY; // '1' or '0'
  private artifactsRoot = process.env.ARTIFACTS_DIR || './artifacts';
  constructor(private readonly prisma: PrismaService) {}

  async maybeMinifyProject(projectId: string, log: (line: string)=>void) {
    const projectDir = path.join(this.artifactsRoot, projectId);
    if (!fs.existsSync(projectDir)) { log(`minify: project artifacts not found path=${projectDir}`); return; }
    // Evaluate flags precedence: FORCE_MINIFY=1 forces enable; FORCE_MINIFY=0 forces disable.
    if (this.force === '0') { log('minify: globally disabled by FORCE_MINIFY=0'); return; }
    let optOut = false;
    try {
      const ps = await this.prisma.projectSetting.findUnique({ where: { projectId } });
      optOut = !!ps?.optOutMinify;
    } catch (e:any) {
      log(`minify: warning could not load project setting err=${e.message}`);
    }
    if (optOut && this.force !== '1') { log('minify: skipped (project optOutMinify=true)'); return; }
    log('minify: starting pass');
    let processed = 0; let skipped = 0; let errors = 0;
    const exts = ['.js','.css','.html','.htm'];
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir)) {
        const full = path.join(dir, entry);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) { walk(full); continue; }
        const ext = path.extname(entry).toLowerCase();
        if (!exts.includes(ext)) continue;
        if (/\.min\.(js|css)$/.test(entry)) { skipped++; continue; }
        try {
          const original = fs.readFileSync(full, 'utf8');
          const before = original.length;
          let out = original;
          if (ext === '.js') out = minifyJs(original);
          else if (ext === '.css') out = minifyCss(original);
          else if (ext === '.html' || ext === '.htm') out = minifyHtml(original);
          if (out.length < before) {
            fs.writeFileSync(full, out, 'utf8');
            processed++;
          } else {
            skipped++;
          }
        } catch (e:any) {
          errors++; log(`minify: error file=${full} err=${e.message}`);
        }
      }
    };
    walk(projectDir);
    log(`minify: complete processed=${processed} skipped=${skipped} errors=${errors}`);
  }
}
