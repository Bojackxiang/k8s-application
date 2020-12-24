FROM node:alpine

# Add the following line 
ENV CI=true

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

# EXPOSE 4001

CMD ["npm", "start"]