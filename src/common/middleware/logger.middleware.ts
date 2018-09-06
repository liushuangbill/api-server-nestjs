import { logger } from '../utils/logger.utils'

export function ConsoleLog() {
  return (req, res, next) => {
    req._startTime = Date.now()

    const calResponseTime = () => {
      const ms = Date.now() - req._startTime
      const length = res.get('Content-Length')
      logger.log({
        level: 'info',
        message: `${req.method} ${req.path} ${res.statusCode} ${length}byte - ${ms}ms`,
      })
    }

    res.once('finish', calResponseTime);
    res.once('close', calResponseTime);
    next()
  }
}
