import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  ForbiddenException
} from "@nestjs/common"
import { MusicService } from "./music.service"
import { Observable } from "rxjs"
import { ResDto } from "common/dto/res.dto"

@Controller("music")
export class MusicController {
  constructor(private musicService: MusicService) {}

  // 歌手列表
  @Get("/getDiscList")
  getDiscList(@Query() query): Observable<ResDto> {
    const resData$ = this.musicService.getDiscList(query)
    return resData$
  }

  // 歌词
  @Get("/lyric")
  getLyric(@Query() query): Observable<ResDto> {
    const resData$ = this.musicService.getLyric(query)
    throw resData$
  }

  // 歌曲播放地址
  @Post("/purlUrl")
  getSongsUrl(@Body() body): Observable<ResDto> {
    const resData$ = this.musicService.getSongsUrl(body)
    return resData$
  }
}
