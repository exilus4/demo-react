FROM nginx

RUN rm /usr/share/nginx/html/50x.html

COPY ./build/ /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN ls -laR /usr/share/nginx/html/*

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]