#!/usr/bin/env bash
set -euo pipefail

if [[ "${SKIP_SERVICES:-}" == "1" ]]; then
  echo "[ci:services] Skipped via SKIP_SERVICES=1"
  exit 0
fi

# Detect docker & compose
if ! command -v docker >/dev/null 2>&1; then
  echo "[ci:services] Docker not installed; cannot launch services." >&2
  exit 1
fi
if ! docker info >/dev/null 2>&1; then
  echo "[ci:services] Docker daemon not reachable; start Docker." >&2
  exit 1
fi

COMPOSE_FILE="docker-compose.yml"
if [[ ! -f "$COMPOSE_FILE" ]]; then
  echo "[ci:services] $COMPOSE_FILE not found at repo root" >&2
  exit 1
fi

# Start only the dependencies needed for tests (postgres, redis) in detached mode.
# Use --quiet-pull to reduce noise; ignore already running containers.
echo "[ci:services] Starting postgres & redis (detached)..."
docker compose up -d postgres redis

# Wait for health (reuse healthchecks from compose)
MAX_WAIT=60
INTERVAL=3
start_time=$(date +%s)

function is_healthy() {
  local svc=$1
  local status
  status=$(docker inspect --format='{{json .State.Health.Status}}' "$(docker compose ps -q "$svc")" 2>/dev/null || echo '"starting"')
  [[ $status == "\"healthy\"" ]]
}

for svc in postgres redis; do
  echo "[ci:services] Waiting for $svc health..."
  while ! is_healthy "$svc"; do
    sleep "$INTERVAL"
    now=$(date +%s)
    if (( now - start_time > MAX_WAIT )); then
      echo "[ci:services] Timeout waiting for $svc to become healthy" >&2
      docker compose ps
      exit 1
    fi
  done
  echo "[ci:services] $svc healthy."
done

echo "[ci:services] Services ready."
