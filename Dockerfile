FROM node:alpine
WORKDIR /app
EXPOSE 4000
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install typescript -g
RUN npm install
COPY . .

CMD [ "npm", "run", "start:dev" ]


 # docker build . -t nodefornest 
 # docker run -d -p 4000:4000 --name nest nodefornest:latest