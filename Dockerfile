FROM node

WORKDIR /app

COPY package*.json ./

# COPY ./src ./src
# COPY ./public ./public

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
