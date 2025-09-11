---
title: Getting Started Overview
---

## Purpose

High-level orientation to the platform before you dive into local or production setup.

## What You Can Do Today

- Create users (first becomes operator)
- Create projects (static site containers)
- Upload a ZIP archive to create a deployment (artifact stored; build pipeline execution WIP)
- View health/status endpoints

## Core Concepts

| Concept | Description |
|---------|-------------|
| Project | Logical site with name and (future) domain/subdomain mapping |
| Deployment | A versioned artifact produced from an upload/build |
| Build Job | Row tracking asynchronous build execution (currently created PENDING) |
| Artifact | Extracted static files persisted under `ARTIFACTS_DIR` |
| Role | USER / ADMIN / OPERATOR controls privileges |

## Typical Flow (MVP)

1. Operator deploys the stack (docker-compose or Coolify)
2. Operator registers first account (auto-operator)
3. User (operator or normal) creates a project
4. User uploads a ZIP (validated & stored; deployment marked BUILDING; job PENDING)
5. Future: Build worker processes job -> ACTIVE / FAILED status

## Deployment Models

| Environment | Recommended Path |
|-------------|------------------|
| Local Dev | `docker compose up` with Postgres/Redis + watch mode |
| Self-Hosted Small Prod | `docker-compose.prod.yml` with Traefik |
| Platform (Coolify) | Use `docker-compose.coolify.yml` and managed ingress |

## Where To Go Next

| Goal | Doc |
|------|-----|
| Run locally | `getting-started/local-development.md` |
| Fast minimal run | `getting-started/quickstart.md` (below) |
| Deploy on Coolify | `operations/coolify.md` |
| Understand architecture | `architecture/spec.md` |
| Plan contributions | `development/contributing.md` |

## Roadmap Snapshot

See `roadmap.md` for upcoming build execution, multi-domain routing, rollback & snippet injection.
