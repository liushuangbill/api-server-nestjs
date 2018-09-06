import { LoggerService } from '@nestjs/common';
import { logger } from 'common/utils/logger.utils'

export class MyLogger implements LoggerService {
  log(message: string) {
    console.info('\x1b[32m' + message + '\x1b[37m')
  }

  error(message: string, trace: string) {
    logger.log({
      level: 'error',
      message: trace + message
    })
    console.error('\x1b[31m' + message + '\x1b[37m')
  }

  warn(message: string) {
    logger.log({
      level: 'warn',
      message: message
    })
    console.warn('\x1b[33m' + message + '\x1b[37m')
  }
}
