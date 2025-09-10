-- Add optional unique domain to Project
ALTER TABLE "Project" ADD COLUMN "domain" TEXT UNIQUE;
