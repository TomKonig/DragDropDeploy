import * as fs from "fs";
import * as path from "path";

import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
  HttpCode,
  HttpStatus,
  Param,
  Get,
  Res,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Express } from "express";
import { Response } from "express";
import * as multer from "multer";

import { DeploymentsService } from "./deployments.service";
import { UploadExtractionService } from "./upload-extraction.service";

export interface UploadResponse {
  deploymentId: string;
  status: string;
  projectId: string;
  artifactPath: string | null;
}

@Controller("deployments")
export class DeploymentsController {
  constructor(
    private readonly extraction: UploadExtractionService,
    private readonly deployments: DeploymentsService,
  ) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("file", { storage: multer.memoryStorage() }))
  @HttpCode(HttpStatus.CREATED)
  async uploadArchive(
    @UploadedFile() file: Express.Multer.File,
    @Body("projectId") projectId: string,
  ): Promise<UploadResponse> {
    // Test environment accommodates missing auth; no global mutation needed.
    if (!file) throw new BadRequestException("file is required");
    // Basic validation for projectId to prevent unsafe path usage; matches other endpoints' pattern
    if (!/^c[a-z0-9]{24,}$/i.test(projectId)) {
      throw new BadRequestException("Invalid projectId");
    }
    const lower = file.originalname.toLowerCase();
    if (!lower.endsWith(".zip"))
      throw new BadRequestException("Only .zip files supported");
    const maxMb = Number(process.env.MAX_UPLOAD_MB || 25);
    if (file.size > maxMb * 1024 * 1024)
      throw new BadRequestException(`File exceeds MAX_UPLOAD_MB of ${maxMb}MB`);
    const { tempDir } = await this.extraction.validateAndStage(
      projectId,
      file.buffer,
      file.originalname,
    );
    const deployment = await this.deployments.createWithArtifact(
      projectId,
      tempDir,
    );
    return {
      deploymentId: deployment.id,
      status: deployment.status,
      projectId,
      artifactPath: deployment.artifactPath ?? null,
    };
  }

  @Post(":id/activate")
  async activate(@Param("id") id: string) {
    if (!/^c[a-z0-9]{24,}$/i.test(id))
      throw new BadRequestException("Invalid id");
    const result = await this.deployments.activateDeployment(id);
    return { deploymentId: result.id, activePath: result.activePath };
  }

  @Get("/project/:projectId/site/*")
  async serve(@Param("projectId") projectId: string, @Res() res: Response) {
    if (!/^c[a-z0-9]{24,}$/i.test(projectId))
      return res.status(400).send("Invalid projectId");
    const activePath = await this.deployments.getActiveArtifactPath(projectId);
    if (!activePath) return res.status(404).send("No active deployment");
    // Extract wildcard path segment
    const wildcard = (res.req.params as Record<string, unknown>)[0];
    const reqPath = typeof wildcard === "string" ? wildcard : "";
    const safeReq = reqPath.replace(/\\/g, "/");
    const finalPath = path.join(activePath, safeReq || "index.html");
    const finalReal = path.resolve(finalPath);
    if (!finalReal.startsWith(activePath + path.sep))
      return res.status(400).send("Invalid path");
    try {
      const stat = await fs.promises.stat(finalReal).catch(() => null);
      if (!stat) return res.status(404).send("Not found");
      if (stat.isDirectory()) {
        const index = path.join(finalReal, "index.html");
        if (fs.existsSync(index)) {
          return res.sendFile(index);
        }
        return res.status(403).send("Directory listing disabled");
      }
      return res.sendFile(finalReal);
    } catch {
      return res.status(500).send("Error serving file");
    }
  }

  @Post("/project/:projectId/rollback")
  async rollback(
    @Param("projectId") projectId: string,
    @Body("targetDeploymentId") targetDeploymentId?: string,
  ) {
    if (!/^c[a-z0-9]{24,}$/i.test(projectId))
      throw new BadRequestException("Invalid projectId");
    if (targetDeploymentId && !/^c[a-z0-9]{24,}$/i.test(targetDeploymentId))
      throw new BadRequestException("Invalid targetDeploymentId");
    const result = await this.deployments.rollback(
      projectId,
      targetDeploymentId,
    );
    return { deploymentId: result.id, activePath: result.activePath };
  }
}
