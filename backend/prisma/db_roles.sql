-- Least privilege role setup
-- Run manually with a superuser (e.g., psql) in dev; automate via migration sidecar in production.

-- Variables (replace if different):
-- Database: ddd
-- App schemas: public (will move to dedicated schema later)

-- Create roles
DO $$
BEGIN
  CREATE ROLE ddd_app_ro NOLOGIN;
EXCEPTION WHEN duplicate_object THEN RAISE NOTICE 'Role ddd_app_ro exists'; END;$$;

DO $$
BEGIN
  CREATE ROLE ddd_app_rw NOLOGIN;
EXCEPTION WHEN duplicate_object THEN RAISE NOTICE 'Role ddd_app_rw exists'; END;$$;

DO $$
BEGIN
  CREATE ROLE ddd_migrator NOLOGIN;
EXCEPTION WHEN duplicate_object THEN RAISE NOTICE 'Role ddd_migrator exists'; END;$$;

-- Grant hierarchy
GRANT ddd_app_ro TO ddd_app_rw;
GRANT ddd_app_rw TO ddd_migrator;

-- Schema & default privileges (assuming public for now)
GRANT USAGE ON SCHEMA public TO ddd_app_ro;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO ddd_app_ro;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO ddd_app_ro;

GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO ddd_app_rw;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT INSERT, UPDATE, DELETE ON TABLES TO ddd_app_rw;

-- Migrator gets DDL rights
GRANT CREATE, USAGE ON SCHEMA public TO ddd_migrator;
GRANT ALL ON ALL TABLES IN SCHEMA public TO ddd_migrator;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO ddd_migrator;

-- Future: RLS policies; migrator role will set them.

-- Application connection roles (login roles)
DO $$ BEGIN CREATE ROLE ddd_app_login LOGIN PASSWORD 'change_me_ro'; EXCEPTION WHEN duplicate_object THEN RAISE NOTICE 'Role ddd_app_login exists'; END; $$;
-- Attach privileges (choose ro or rw depending on service)
GRANT ddd_app_rw TO ddd_app_login;

-- Optional read-only reporting login
DO $$ BEGIN CREATE ROLE ddd_report_login LOGIN PASSWORD 'change_me_report'; EXCEPTION WHEN duplicate_object THEN RAISE NOTICE 'Role ddd_report_login exists'; END; $$;
GRANT ddd_app_ro TO ddd_report_login;

-- Security reminders:
-- 1. Rotate the placeholder passwords before any remote deployment.
-- 2. Use separate DATABASE_URL for migrations vs runtime.
-- 3. When RLS enabled, ensure policies reference current_user or custom GUC (e.g., set_config('app.user_id', ...)).
