import * as winston from 'winston'
import * as path from 'path'

export const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../../../logs/error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../../../logs/warn.log'),
      level: 'warn'
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../../../logs/info.log'),
      level: 'info'
    })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    level: 'info',
    format: winston.format.simple()
  }));
}
