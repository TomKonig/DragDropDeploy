import { randomUUID } from "crypto";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

import { Injectable, BadRequestException } from "@nestjs/common";
import JSZip from "jszip";

interface ExtractResult {
  tempDir: string;
  fileCount: number;
  totalUncompressedBytes: number;
}

@Injectable()
export class UploadExtractionService {
  private readonly maxEntries = 2000; // basic guard; later configurable
  private readonly maxCompressionRatio = 200; // crude zip bomb heuristic (uncompressed/zipSize)

  async validateAndStage(
    projectId: string,
    archiveBuffer: Buffer,
    originalName: string,
  ): Promise<ExtractResult> {
    if (!projectId) throw new BadRequestException("projectId is required");
    if (!/\.zip$/i.test(originalName))
      throw new BadRequestException("Only .zip uploads supported initially");
    // Magic number validation for ZIP signatures:
    // Local file header: PK\x03\x04, Empty archive: PK\x05\x06, Spanned/split: PK\x07\x08
    if (
      archiveBuffer.length < 4 ||
      archiveBuffer[0] !== 0x50 ||
      archiveBuffer[1] !== 0x4b
    ) {
      throw new BadRequestException(
        "Invalid zip signature (missing PK header)",
      );
    }
    const sig = archiveBuffer.readUInt16BE(2); // read the next two bytes
    const allowed = new Set([0x0304, 0x0506, 0x0708]);
    if (!allowed.has(sig)) {
      throw new BadRequestException("Invalid or unsupported zip structure");
    }
    const zipSize = archiveBuffer.length;
    // loadAsync returns a JSZip instance whose files map is Record<string, JSZipObject>
    const zip = await JSZip.loadAsync(archiveBuffer, { checkCRC32: true });
    const entries = Object.values(zip.files);
    if (entries.length === 0) throw new BadRequestException("Archive empty");
    if (entries.length > this.maxEntries)
      throw new BadRequestException("Too many files");
    const tempDir = path.join(os.tmpdir(), "ddd-upload-" + randomUUID());
    await fs.promises.mkdir(tempDir, { recursive: true });
    let totalUncompressedBytes = 0;
    let fileCount = 0;
    for (const entry of entries) {
      if (entry.dir) continue; // skip directories; they'll be created as needed
      const rawName: string = entry.name; // JSZipObject.name always string
      if (rawName.includes("../") || rawName.includes("..\\")) {
        throw new BadRequestException("Path traversal detected");
      }
      const unixName = rawName.replace(/\\/g, "/");
      if (unixName.startsWith("/"))
        throw new BadRequestException("Absolute path not allowed");
      // Normalize and ensure resulting path remains within tempDir
      const normalized = path.posix.normalize(unixName);
      // After posix normalization, reject if path escapes (.. segments) OR if it becomes absolute
      if (
        normalized.startsWith("../") ||
        normalized.includes("/../") ||
        normalized === ".."
      ) {
        throw new BadRequestException("Path traversal detected");
      }
      // Defensive: still reject raw lingering .. to cover exotic encodings not flattened
      if (/\.\./.test(normalized))
        throw new BadRequestException("Path traversal detected");
      const destPath = path.join(tempDir, normalized);
      const rel = path.relative(tempDir, destPath);
      if (rel.startsWith(".."))
        throw new BadRequestException("Path traversal detected");
      const parent = path.dirname(destPath);
      await fs.promises.mkdir(parent, { recursive: true });
      // entry.async returns a Promise<Buffer> when 'nodebuffer' requested (per @types/jszip)
      const content = await entry.async("nodebuffer");
      totalUncompressedBytes += content.length;
      if (totalUncompressedBytes / zipSize > this.maxCompressionRatio) {
        throw new BadRequestException(
          "Compression ratio too high (possible zip bomb)",
        );
      }
      await fs.promises.writeFile(destPath, content, { mode: 0o644 });
      fileCount++;
    }
    return { tempDir, fileCount, totalUncompressedBytes };
  }
}
