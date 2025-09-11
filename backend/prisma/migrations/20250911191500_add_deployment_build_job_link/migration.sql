-- Link Deployment to BuildJob (nullable)
ALTER TABLE "Deployment" ADD COLUMN "buildJobId" TEXT;

ALTER TABLE "Deployment" ADD CONSTRAINT "Deployment_buildJobId_fkey"
  FOREIGN KEY ("buildJobId") REFERENCES "BuildJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE INDEX IF NOT EXISTS "Deployment_buildJobId_idx" ON "Deployment"("buildJobId");
