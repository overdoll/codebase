# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app

# Note: our CI caches node_modules between builds in an S3 bucket so we just copy it from local
COPY ./node_modules ./node_modules

COPY ./src ./src
COPY ./public ./public
COPY next.config.js .
COPY next-env.d.ts .
COPY .babelrc .
COPY package.json .
COPY tsconfig.json .
COPY lingui.config.ts .

ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn locale:compile
RUN yarn build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/build/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/build/static ./build/static

USER nextjs

EXPOSE 8000

ENV PORT 8000

CMD ["node", "server.js"]
