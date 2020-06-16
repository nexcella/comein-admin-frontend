FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY ./.nginx/nginx.conf /etc/nginx/conf.d

COPY ./dist/ /usr/share/nginx/html/

EXPOSE 80
# start nginx
CMD ["nginx", "-g", "daemon off;"]
