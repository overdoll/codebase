FROM caddy:2.4.6

COPY ./development/caddy/Caddyfile /etc/caddy/Caddyfile
COPY ./development/caddy/public /var/www/html
