FROM php:8.3

# Container + PHP Setup
ARG XDEBUG_INI="/usr/local/etc/php/conf.d/xdebug.ini"
# Install, enable and configure xdebug
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && echo "[xdebug]" > $XDEBUG_INI \
    && echo "xdebug.mode = coverage" >> $XDEBUG_INI

RUN docker-php-ext-install mysqli

# Install Composer
RUN curl -s https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer

RUN mkdir /var/cache/composer
VOLUME /var/cache/composer
RUN chown -R www-data:www-data /var/cache/composer
ENV COMPOSER_HOME=/var/cache/composer

# WP CLI Setup
ENV WORDPRESS_CLI_VERSION 2.9.0

RUN set -ex; \
    curl -o /usr/local/bin/wp -fSL "https://github.com/wp-cli/wp-cli/releases/download/v${WORDPRESS_CLI_VERSION}/wp-cli-${WORDPRESS_CLI_VERSION}.phar"; \
    curl -o /usr/local/bin/wp.sha512 -fSL "https://github.com/wp-cli/wp-cli/releases/download/v${WORDPRESS_CLI_VERSION}/wp-cli-${WORDPRESS_CLI_VERSION}.phar.sha512"; \
    \
    echo "$(cat /usr/local/bin/wp.sha512) /usr/local/bin/wp" | sha512sum -c -; \
    chmod +x /usr/local/bin/wp; \
    \
    wp --allow-root --version

ENV WP_TESTS_DIR /usr/src/vendor/wordpress/wordpress/tests/phpunit
ENV WP_TESTS_CONFIG_FILE_PATH /usr/src/tests/functional

VOLUME /usr/src
WORKDIR /usr/src
