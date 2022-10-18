# Git
git fetch --all
git log --all --oneline --graph -10
git reset --hard origin/master

# Docker
docker compose up -d
docker compose stop jenkins
docker compose rm jenkins -f
docker compose up jenkins -d


# SSL/TLS
openssl req -days 3650 -x509 -newkey rsa:2048 -sha256 -nodes -keyout %UserProfile%\Desktop\key.pem -out %UserProfile%\Desktop\cert.pem -subj "/C=/ST=/L=/O=/OU=web/CN=medihome.vn"

sudo docker run -it --rm --name certbot -v "/etc/letsencrypt:/etc/letsencrypt" -v "/var/lib/letsencrypt:/var/lib/letsencrypt" -p 80:80 certbot/certbot certonly
rm -rf ~/apps/medihome-vn/mh-nginx/ssl/letsencrypt/
cp -R /etc/letsencrypt/archive/ ~/apps/medihome-vn/mh-nginx/ssl/letsencrypt/

# Nginx
docker exec mhc_nginx nginx -t
docker exec mhc_nginx nginx -s reload

# Show all Port
netstat -tulpn
