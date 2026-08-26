#!/bin/bash
set -e

echo "==> AI Excellence Academy — Starting..."

# ── .env ──────────────────────────────────────────────
if [ ! -f /var/www/html/.env ]; then
    echo "==> Creating .env from .env.example"
    cp /var/www/html/.env.example /var/www/html/.env
fi

# ── APP_KEY ───────────────────────────────────────────
if ! grep -q "APP_KEY=base64:" /var/www/html/.env 2>/dev/null; then
    echo "==> Generating APP_KEY"
    cd /var/www/html
    php artisan key:generate --force
fi

# ── Permissions ───────────────────────────────────────
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache 2>/dev/null || true
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache 2>/dev/null || true

# ── Storage symlink ───────────────────────────────────
if [ ! -L /var/www/html/public/storage ]; then
    cd /var/www/html
    php artisan storage:link 2>/dev/null || true
fi

# ── Cache ─────────────────────────────────────────────
echo "==> Caching config, routes, views"
cd /var/www/html
php artisan config:cache 2>/dev/null || true
php artisan route:cache 2>/dev/null || true
php artisan view:cache 2>/dev/null || true

# ── Migrate ───────────────────────────────────────────
if [ "$RUN_MIGRATIONS" = "true" ]; then
    echo "==> Running migrations"
    php artisan migrate --force
fi

echo "==> Starting services..."
exec "$@"
