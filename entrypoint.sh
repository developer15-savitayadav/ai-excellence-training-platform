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

# ── Permissions (www-data must own everything) ─────────
mkdir -p /var/www/html/storage/framework/{sessions,views,cache} /var/www/html/storage/logs /var/www/html/bootstrap/cache
touch /var/www/html/storage/logs/laravel.log /var/www/html/database/database.sqlite
chown -R www-data:www-data /var/www/html
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

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

# ── Seed admin user (safe to re-run) ─────────────────
if [ "$RUN_MIGRATIONS" = "true" ]; then
    echo "==> Seeding admin user"
    php artisan db:seed --force 2>/dev/null || true
fi

echo "==> Starting services..."
exec "$@"
