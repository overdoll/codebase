import winston from 'winston'

export default winston.createLogger({
  level: 'info',
  exitOnError: false,
  format: winston.format.combine(
    winston.format.colorize(),
    process.env.APP_DEBUG === 'true'
      ? winston.format.simple()
      : winston.format.json()
  ),
  transports: [new winston.transports.Console()],
  exceptionHandlers: [new winston.transports.Console()]
})
