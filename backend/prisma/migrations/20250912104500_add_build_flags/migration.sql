-- Add buildFlags text[] column to ProjectSetting
ALTER TABLE "ProjectSetting" ADD COLUMN IF NOT EXISTS "buildFlags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
