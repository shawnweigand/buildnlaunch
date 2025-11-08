# --- Stage 1: PHP dependencies ---
    FROM serversideup/php:8.4-fpm-nginx-bookworm AS vendor

    USER root
    WORKDIR /app

    # Install required PHP extensions first
    RUN install-php-extensions bcmath pcntl sqlsrv pdo_sqlsrv

    # Copy only composer files to leverage Docker cache
    COPY composer.json composer.lock ./

    # Install dependencies for production only
    RUN composer install --no-dev --no-scripts --no-progress --prefer-dist --optimize-autoloader

    # --- Stage 2: Frontend build ---
    FROM node:22-bookworm AS frontend

    WORKDIR /app
    COPY package.json package-lock.json ./

    RUN npm ci

    COPY . .
    RUN npm run build

    # --- Stage 3: Final runtime image ---
    FROM serversideup/php:8.4-fpm-nginx-bookworm

    USER root
    WORKDIR /var/www/html

    # Install required PHP extensions again for runtime
    RUN install-php-extensions bcmath pcntl sqlsrv pdo_sqlsrv \
        && apt-get update && apt-get install -y --no-install-recommends unixodbc unixodbc-dev \
        && rm -rf /var/lib/apt/lists/*
    # Copy built app from previous stages

    COPY --from=vendor /app/vendor ./vendor
    COPY --from=frontend /app/public/build ./public/build
    COPY . .

    # Fix permissions for www-data
    RUN chown -R www-data:www-data /var/www/html

    USER www-data
    RUN composer dump-autoload --optimize
