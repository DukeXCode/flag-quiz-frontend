# use the latest version of the official nginx image as the base image
FROM nginx:latest
# copy the custom nginx configuration file to the container in the
# default location
COPY nginx.conf etc/nginx/nginx.conf
# copy the built Angular app files to the default nginx html directory
COPY /dist/flag-quiz-frontend/browser /usr/share/nginx/html
