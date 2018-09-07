import { Injectable } from "@nestjs/common"
import { Observable } from "rxjs"
import { ResDto } from "common/dto/res.dto"
import { HttpWrapService } from "common/service/http-wrap.service"
import { map, tap } from "rxjs/operators"

@Injectable()
export class MusicService {
  qqHeaders = {
    referer: "https://c.y.qq.com/",
    host: "c.y.qq.com"
  }

  constructor(private httpWrap: HttpWrapService) {}

  // 获取歌单列表
  getDiscList(query: object): Observable<ResDto> {
    const url = "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg"
    return this.httpWrap
      .getReq(url, query, this.qqHeaders)
      .pipe(map(resData => this.parseRes(resData)))
  }

  // 获取歌词
  getLyric(query: object): Observable<ResDto> {
    const url = "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg"
    return this.httpWrap.getReq(url, query, this.qqHeaders).pipe(
      map(resData => {
        // 这个接口会返回jsonp，所以作为字符串处理
        const reg = /^\w+\(({.*})\)$/
        const data = JSON.parse((resData as string).match(reg)[1])
        return new ResDto({
          code: data.code,
          data: data.lyric,
          message: data.message
        })
      })
    )
  }

  // 获取歌曲url
  getSongsUrl(body: object): Observable<ResDto> {
    const url = "http://ustbhuangyi.com/music/api/getPurlUrl"
    return this.httpWrap.postReq(url, body).pipe(
      map(resData => {
        const mid = resData["url_mid"]
        return new ResDto({
          code: mid.code,
          data: mid.data
        })
      })
    )
  }

  // 解析resData
  private parseRes(resData) {
    return new ResDto({
      code: resData["code"],
      message: resData["message"],
      data: resData["data"]
    })
  }
}
