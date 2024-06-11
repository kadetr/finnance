FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8008
EXPOSE 8080
CMD ["./mig-n-sta.sh"]