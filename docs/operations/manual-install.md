---
title: Manual Install (No Docker)
---

## Manual Install (No Docker)

For operators who prefer system packages / bare metal. Assumes Linux (Ubuntu/Debian) with systemd. Adjust paths for other distros.

### Components

- Node.js 20.x (build + runtime)
- PostgreSQL 16
- Redis 7
- (Optional) Nginx or Caddy reverse proxy (TLS termination)

### Create System User

```bash
sudo useradd -r -m -d /opt/dragdropdeploy -s /usr/sbin/nologin ddd
```

### Install Dependencies

Use your package manager for Postgres & Redis. Install Node via official tarball or nvm (for production prefer distro or binary tarball over nvm inside service).

### Directory Layout

```text
/opt/dragdropdeploy
  app/        # Git checkout
  data/       # Artifacts, uploads
  logs/       # (Optional) log files if not journald
```

### Clone Repo

```bash
sudo -u ddd bash -c 'cd /opt/dragdropdeploy && git clone https://github.com/TomKonig/DragDropDeploy.git app'
```

### Build Application

```bash
cd /opt/dragdropdeploy/app
sudo -u ddd npm install
sudo -u ddd npm run generate:locales
sudo -u ddd npm run build
```

### Configure Environment

Create `/opt/dragdropdeploy/app/.env.production`:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://ddd:change@localhost:5432/ddd
REDIS_URL=redis://localhost:6379/0
JWT_SECRET=CHANGE_THIS
JWT_EXPIRES_IN=15m
MAX_UPLOAD_MB=25
STORAGE_ROOT=/opt/dragdropdeploy/data/storage
```

Ensure directories:

```bash
sudo -u ddd mkdir -p /opt/dragdropdeploy/data/storage
```

### Database Setup

Create role & DB:

```bash
sudo -u postgres psql -c "CREATE ROLE ddd LOGIN PASSWORD 'change';"
sudo -u postgres psql -c 'CREATE DATABASE ddd OWNER ddd;'
```

Run migrations:

```bash
cd /opt/dragdropdeploy/app/backend
sudo -u ddd npx prisma migrate deploy
```

### Systemd Service

Create `/etc/systemd/system/dragdropdeploy-backend.service`:

```
[Unit]
Description=DragDropDeploy Backend
After=network.target postgresql.service redis-server.service

[Service]
Type=simple
User=ddd
WorkingDirectory=/opt/dragdropdeploy/app/backend
EnvironmentFile=/opt/dragdropdeploy/app/.env.production
ExecStart=/usr/bin/node dist/main.js
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Reload and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now dragdropdeploy-backend
```

### Reverse Proxy (Nginx Example)

```
server {
  server_name app.example.com;
  listen 80;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Add TLS via certbot or use Caddy for automatic HTTPS.

### Upgrades

```bash
sudo -u ddd bash -c 'cd /opt/dragdropdeploy/app && git fetch --all && git checkout vX.Y.Z'
cd /opt/dragdropdeploy/app
sudo -u ddd npm ci
sudo -u ddd npm run generate:locales
sudo -u ddd npm run build
cd backend
sudo -u ddd npx prisma migrate deploy
sudo systemctl restart dragdropdeploy-backend
```

### Rollback

Checkout previous tag and repeat build steps. If migration incompatible, restore DB from backup before restart.

### Backups

```
pg_dump -U ddd ddd > /var/backups/ddd-$(date +%F).sql
```

Schedule via cron.

### Monitoring & Logs

View logs:

```bash
journalctl -u dragdropdeploy-backend -f
```

### Hardening (Future)

- Run behind dedicated non-root reverse proxy with rate limits
- Systemd sandbox directives (ProtectSystem, ProtectHome, NoNewPrivileges)
- Separate least-priv DB roles beyond single user
- Log redaction & metrics endpoint exposure over localhost only
