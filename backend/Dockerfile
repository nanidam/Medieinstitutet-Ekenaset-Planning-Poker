FROM node:18-alpine
COPY ./ /backend
WORKDIR /backend
RUN npm install
RUN npm run build
ENV NODE_ENV=production
CMD ["node", "dist/app.js"]
EXPOSE 3000