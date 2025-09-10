-- Create BuildJob table and enum
CREATE TYPE "BuildJobStatus" AS ENUM ('PENDING','RUNNING','SUCCESS','FAILED');

CREATE TABLE "BuildJob" (
  "id" TEXT PRIMARY KEY,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "projectId" TEXT NOT NULL,
  "status" "BuildJobStatus" NOT NULL DEFAULT 'PENDING',
  "logsPath" TEXT,
  "artifactPath" TEXT,
  "version" INTEGER,
  CONSTRAINT "BuildJob_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "BuildJob_projectId_idx" ON "BuildJob"("projectId");
