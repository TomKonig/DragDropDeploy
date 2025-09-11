---
title: Quickstart
---

## Goal

Spin up the core API + dependencies locally and perform a first project deployment (upload) in under 5 minutes.

## 1. Clone

```bash
git clone https://github.com/TomKonig/DragDropDeploy.git
cd DragDropDeploy
```

## 2. Start Dependencies

```bash
docker compose up -d postgres redis
```

## 3. Environment

Create `.env`:

```env
NODE_ENV=development
DATABASE_URL=postgresql://ddd:ddd@localhost:5432/ddd
JWT_SECRET=dev_change_me
```

(Defaults cover other values.)

## 4. Install & Migrate

```bash
npm install
npm run prisma:migrate:deploy -w backend
```

## 5. Start Backend

```bash
npm run dev -w backend
```

API listens on `http://localhost:3000`.

## 6. Create Operator User

```bash
curl -s -X POST http://localhost:3000/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@example.com","password":"StrongP@ssw0rd"}' | jq
```

## 7. Login & Capture Token

```bash
TOKEN=$(curl -s -X POST http://localhost:3000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@example.com","password":"StrongP@ssw0rd"}' | jq -r .accessToken)
```

## 8. Create Project

```bash
curl -s -X POST http://localhost:3000/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"name":"mysite"}' | jq
```

## 9. Prepare Sample ZIP

```bash
mkdir -p /tmp/mysite && echo '<h1>Hello</h1>' > /tmp/mysite/index.html && \
  (cd /tmp/mysite && zip -r ../mysite.zip .)
```

## 10. Upload Deployment

```bash
curl -s -X POST http://localhost:3000/deployments/upload \
  -H "Authorization: Bearer $TOKEN" \
  -F 'projectId=<REPLACE_WITH_PROJECT_ID>' \
  -F 'file=@/tmp/mysite.zip' | jq
```

Response shows deployment with status `BUILDING` and a `buildJob` row `PENDING`.

## 11. Verify Artifact

Check artifact directory (default `./artifacts`) – you should see extracted file under a deployment folder.

## Next

- Explore planned build execution in `architecture/build-pipeline.md`
- Review security posture in `reference/security-baseline.md`
- Configure advanced env vars in `reference/configuration.md`
