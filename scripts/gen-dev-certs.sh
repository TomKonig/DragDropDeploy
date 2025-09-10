#!/usr/bin/env bash
set -euo pipefail
CERT_DIR="./certs/dev"
mkdir -p "$CERT_DIR"
KEY="$CERT_DIR/selfsigned.key"
CRT="$CERT_DIR/selfsigned.crt"
if [[ -f "$KEY" && -f "$CRT" ]]; then
  echo "Dev certs already exist at $CERT_DIR" >&2
  exit 0
fi
openssl req -x509 -nodes -newkey rsa:2048 -days 365 \
  -subj "/CN=localhost" \
  -keyout "$KEY" -out "$CRT"
echo "Generated self-signed certs in $CERT_DIR" >&2
