import { HttpService, Injectable } from "@nestjs/common"
import { catchError, map, tap } from "rxjs/operators"
import { Observable, of } from "rxjs"
import { ResDto } from "common/dto/res.dto"
import { AxiosResponse } from "axios"

@Injectable()
export class HttpWrapService {
  constructor(private httpService: HttpService) {}

  // get请求处理
  getReq(url: string, query: object, headers?: object): Observable<any> {
    return this.httpService
      .get(url, {
        params: query,
        headers: headers
      })
      .pipe(
        map(res => res.data),
        catchError(this.handleError())
      )
  }

  // post
  postReq(url: string, data: object, headers?: object): Observable<any> {
    return this.httpService
      .post(url, data, {
        headers: headers
      })
      .pipe(
        map(res => res.data),
        catchError(this.handleError())
      )
  }

  // 错误处理
  private handleError() {
    return (error: Error): Observable<ResDto> => {
      return of(new ResDto({ code: 502, message: error.message }))
    }
  }
}
