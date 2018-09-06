import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ResDto } from '../dto/res.dto';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<ResDto>,
  ): Observable<ResDto> {
    return call$.pipe(
      map((data) => ({
        data: data.data,
        code: data.code,
        message: data.message || err[data.code] || data.code
      }))
    )
  }
}

const err = {
  '0': '',
  '-1': '服务器内部错误'
}
