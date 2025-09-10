# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Added

- /auth/me endpoint returning current user profile (excludes passwordHash).
- Public route decorator & guard bypass logic.
- Health endpoint e2e test coverage (public and internal restrictions).
- Random password generator for tests to eliminate hardcoded secret patterns.

### Changed

- Implemented global role + JWT guards with Public decorator for unauthenticated endpoints.
- Project (Site) CRUD fully validated & ownership enforced; marked complete in task list.
- Updated tasklist to reflect implemented security/auth tasks.

### Security

- Removed hardcoded test passwords (replaced with random generation).
- Snyk scans executed (no medium/high issues introduced; remaining low findings are dynamic credential usage in tests).

