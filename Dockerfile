# ─── Stage 1: Build frontend assets ───────────────────
FROM node:20-alpine AS frontend

WORKDIR /app

COPY package.json package-lock.json* .npmrc* ./
RUN npm ci --legacy-peer-deps

COPY vite.config.js jsconfig.json ./
COPY resources/js ./resources/js
COPY resources/css ./resources/css
COPY resources/views ./resources/views
COPY public ./public

RUN npm run build


# ─── Stage 2: Production image ────────────────────────
FROM php:8.3-fpm

# System deps + nginx + supervisor
RUN apt-get update && apt-get install -y \
    nginx supervisor \
    libpng-dev libjpeg-dev libfreetype6-dev libzip-dev \
    libicu-dev libonig-dev libxml2-dev libcurl4-openssl-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip intl opcache \
    && pecl install redis && docker-php-ext-enable redis \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# ── Step 1: Copy full app first (artisan needs bootstrap/, config/, app/) ──
COPY . .

# ── Step 2: Create .env if missing ────────────────────
RUN cp -n .env.example .env 2>/dev/null || true

# ── Step 3: Generate APP_KEY ──────────────────────────
RUN php artisan key:generate --force

# ── Step 4: Install PHP deps (--no-scripts to skip artisan during install) ──
RUN composer install --no-dev --no-interaction --prefer-dist --no-scripts \
    && composer dump-autoload --optimize --no-dev

# ── Step 5: Frontend assets from build stage ─────────
COPY --from=frontend /app/public/build public/build

# ── Step 6: Config files ─────────────────────────────
COPY docker/nginx.conf /etc/nginx/sites-available/default
COPY docker/php-fpm.conf /usr/local/etc/php-fpm.d/www.conf
COPY docker/php-uploads.ini /usr/local/etc/php/conf.d/uploads.ini
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# ── Step 7: Permissions + storage dirs ────────────────
RUN mkdir -p storage/framework/{sessions,views,cache} storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache \
    && chmod +x entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/var/www/html/entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
