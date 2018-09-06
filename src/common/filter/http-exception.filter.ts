import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { ResDto } from '../dto/res.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse()
    const req = ctx.getRequest()

    const errorMsg = exception.message.message || exception.message.error || ''

    res
      .status(exception.getStatus())
      .json(new ResDto({
        code: exception.getStatus(),
        data: {},
        message: errorMsg,
      }))
  }
}
