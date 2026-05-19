FROM node:22

WORKDIR /app

COPY . .
RUN npm i 

VOLUME ["/app/dist"]

CMD ["npm", "run", "build"]
