FROM surenwork/ngk-service-base:1.0.1

USER node
WORKDIR /home/node
COPY package.json /home/node
RUN npm install --production
COPY ./dist /home/node
