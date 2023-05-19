FROM node:18-alpine
COPY ./ /frontend
WORKDIR /frontend
RUN npm install
RUN npm run build
CMD ["npm", "run", "preview"]
EXPOSE 4173