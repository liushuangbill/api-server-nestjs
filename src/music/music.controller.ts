import { Controller, Get, Req, Post, Query, Body } from "@nestjs/common"
import { MusicService } from "./music.service"

@Controller("music")
export class MusicController {
  constructor(private musicService: MusicService) {}

  // 歌手列表
  @Get("/getDiscList")
  getDiscList(@Query() query) {
    const resData$ = this.musicService.getDiscList(query)
    return resData$
  }

  // 歌词
  @Get("/lyric")
  getLyric(@Query() query) {
    const resData$ = this.musicService.getLyric(query)
    return resData$
  }

  // 歌曲播放地址
  @Post("/purlUrl")
  getSongsUrl(@Body() body) {
    const resData$ = this.musicService.getSongsUrl(body)
    return resData$
  }
}
