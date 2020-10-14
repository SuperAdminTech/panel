FROM debian

RUN apt update && apt install -y curl gnupg nginx build-essential gettext-base git
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -

RUN apt install -y nodejs
COPY . /build
COPY nginx.vhost /etc/nginx/sites-available/default
WORKDIR /build

# RUN set -e
# RUN envsubst < src/environments/environment.ts.dist > src/environments/environment.ts
RUN npm install
RUN npm run build:prod
RUN mv dist/* /var/www/html

RUN chmod +x docker-entrypoint.sh
CMD ["./docker-entrypoint.sh"]
