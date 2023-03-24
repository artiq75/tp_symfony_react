FROM php:8.1-fpm
RUN apt-get update && apt-get install -y git \
		libfreetype6-dev \
		libjpeg62-turbo-dev \
		libpng-dev

RUN curl -sSL https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions -o - | sh -s \
      gd zip pdo_mysql

WORKDIR /srv/app

COPY --from=composer /usr/bin/composer /usr/bin/composer