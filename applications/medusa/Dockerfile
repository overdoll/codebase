# Production image, copy all the files and run next
FROM node:16-alpine
WORKDIR /app

ENV NODE_ENV production

ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY next.config.js ./
COPY public ./public
COPY package.json ./package.json


# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --chown=nextjs:nodejs build/standalone ./
COPY --chown=nextjs:nodejs build/static ./build/static

# Copy queries.json to be used eventually when pushed to redis
COPY --chown=nextjs:nodejs src/queries.json ./src/queries.json
# copy push queries scripts so we can run them
COPY push-all-queries.js ./
COPY push-queries.js ./

USER nextjs

EXPOSE 8000

ENV PORT 8000

CMD ["node", "server.js"]
