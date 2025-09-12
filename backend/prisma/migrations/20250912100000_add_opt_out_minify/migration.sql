-- Add optOutMinify column to ProjectSetting if not exists
ALTER TABLE "ProjectSetting" ADD COLUMN IF NOT EXISTS "optOutMinify" BOOLEAN NOT NULL DEFAULT false;
