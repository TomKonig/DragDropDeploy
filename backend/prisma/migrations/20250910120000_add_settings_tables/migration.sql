-- CreateEnum
CREATE TYPE "public"."SettingType" AS ENUM ('STRING', 'INT', 'BOOL', 'JSON');

-- AlterEnum (DeployStatus already exists; no change)

-- CreateTable
CREATE TABLE "public"."SystemSetting" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" "public"."SettingType" NOT NULL DEFAULT 'STRING',
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."ProjectSetting" (
    "projectId" TEXT NOT NULL,
    "userSnippet" TEXT,
    "spaMode" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex / Constraints
ALTER TABLE "public"."SystemSetting" ADD CONSTRAINT "SystemSetting_pkey" PRIMARY KEY ("key");
ALTER TABLE "public"."ProjectSetting" ADD CONSTRAINT "ProjectSetting_pkey" PRIMARY KEY ("projectId");
ALTER TABLE "public"."ProjectSetting" ADD CONSTRAINT "ProjectSetting_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
