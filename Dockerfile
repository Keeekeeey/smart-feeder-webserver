FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -S catWebCamGroup && adduser -S catWebCamUser -G catWebCamGroup

COPY --from=builder /app ./app
COPY --from=builder /app/app/api/log-data ./api/log-data
COPY --from=builder /app/app/components ./components
COPY --from=builder /app/app/motionEventsDashboard ./motionEventsDashboard
COPY --from=builder /app/app/webcam ./webcam
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/prisma ./prisma
COPY --from=builder /app/node_modules/@prisma ./@prisma

RUN chown -R catWebCamUser:catWebCamGroup /app
USER catWebCamUser

EXPOSE 3000
CMD ["node", "server.js"]