FROM node:11-slim
WORKDIR /app
COPY core/package.json core/package.json
COPY content/package.json content/package.json
COPY package.json package.json
COPY yarn.lock ./yarn.lock
RUN yarn
COPY . .
RUN yarn workspace @entrptaher/core run prisma generate
RUN yarn workspace @entrptaher/content run prisma2 generate
EXPOSE 80