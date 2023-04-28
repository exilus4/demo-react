FROM nginx

RUN rm /usr/share/nginx/html/50x.html

COPY ./build/ /usr/share/nginx/html/

RUN ls -laR /usr/share/nginx/html/*
