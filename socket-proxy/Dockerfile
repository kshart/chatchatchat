FROM node:20
RUN apt-get update && apt-get install -y supervisor redis
COPY supervisor /etc/supervisor
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]
