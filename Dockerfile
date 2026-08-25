FROM php:8.3-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev libzip-dev \
    libicu-dev libonig-dev libxml2-dev libcurl4-openssl-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip intl opcache \
    && pecl install redis && docker-php-ext-enable redis \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Install PHP dependencies
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --no-scripts --prefer-dist \
    && composer dump-autoload --optimize --no-dev

# Install Node dependencies and build frontend
COPY package.json .npmrc ./
RUN npm install --legacy-peer-deps

# Copy application code
COPY . .

# Build frontend assets
RUN npm run build

# Cache Laravel
RUN php artisan config:cache && php artisan route:cache && php artisan view:cache 2>/dev/null || true

RUN chown -R www-data:www-data storage bootstrap/cache 2>/dev/null || true

EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
