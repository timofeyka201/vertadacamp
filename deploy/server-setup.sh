#!/usr/bin/env bash
# VertadaCamp deployment script.
# Run as: sudo bash server-setup.sh
# Expects the project archive already extracted to /opt/vertadacamp (see instructions).

set -euo pipefail

APP_DIR="/opt/vertadacamp"
DOMAIN="${1:-}"   # optional: pass your domain as first arg, e.g. sudo bash server-setup.sh vertada.ru

if [ "$EUID" -ne 0 ]; then
  echo "Run with sudo: sudo bash server-setup.sh [domain]"
  exit 1
fi

echo "== Installing Node.js 20 LTS =="
if ! command -v node >/dev/null || [ "$(node -v | cut -d. -f1 | tr -d v)" -lt 20 ]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
node -v

echo "== Installing nginx =="
apt-get update -y
apt-get install -y nginx

echo "== Installing pm2 =="
npm install -g pm2

echo "== Installing app dependencies and building =="
cd "$APP_DIR"
mkdir -p data
[ -f data/applications.json ] || echo "[]" > data/applications.json
npm install
npm run build

echo "== Starting app with pm2 =="
pm2 delete vertadacamp 2>/dev/null || true
pm2 start npm --name vertadacamp -- start
pm2 save
env PATH=$PATH:/usr/bin pm2 startup systemd -u "$(logname)" --hp "/home/$(logname)" | tail -1 | bash || true

echo "== Configuring nginx reverse proxy =="
SERVER_NAME="${DOMAIN:-_}"
cat > /etc/nginx/sites-available/vertadacamp <<NGINX
server {
    listen 80;
    server_name ${SERVER_NAME};

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/vertadacamp /etc/nginx/sites-enabled/vertadacamp
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

echo "== Opening firewall (if ufw active) =="
if command -v ufw >/dev/null && ufw status | grep -q "Status: active"; then
  ufw allow OpenSSH || true
  ufw allow 'Nginx Full' || true
fi

echo "== Done =="
echo "Site should now be reachable at: http://$(curl -s ifconfig.me)"
[ -n "$DOMAIN" ] && echo "and at: http://$DOMAIN (once DNS points here)"
echo "Check status: pm2 status | pm2 logs vertadacamp"
echo ""
echo "To add HTTPS once your domain points to this server:"
echo "  apt-get install -y certbot python3-certbot-nginx"
echo "  certbot --nginx -d $DOMAIN"
