import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException
} from "@nestjs/common"
import { ResDto } from "../dto/res.dto"

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse()
    const req = ctx.getRequest()

    let errorMsg: string
    let status: number
    if (exception.getStatus) {
      errorMsg = exception.message.message || exception.message.error || ""
      status = exception.getStatus()
    } else {
      errorMsg = exception.message
      status = 500
    }

    res.status(status).json(
      new ResDto({
        code: status,
        message: errorMsg
      })
    )
  }
}

/*
export interface ArgumentsHost {
  getArgs<T extends Array<any> = any[]>(): T;
  getArgByIndex<T = any>(index: number): T;
  switchToRpc(): RpcArgumentsHost;
  switchToHttp(): HttpArgumentsHost;
  switchToWs(): WsArgumentsHost;
}
*/
