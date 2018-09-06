import { Controller, Get, Req, Post } from "@nestjs/common";
import { MusicService } from "./music.service";

@Controller('music')
export class MusicController {
  constructor(private musicService: MusicService) { }

  @Get('/getDiscList')
  getDiscList(@Req() req) {
    const query = req.query
    const resData$ = this.musicService.getDiscList(query)
    return resData$
  }

  // 歌词
  @Get('/lyric')
  getLyric(@Req() req) {
    const query = req.query
    const resData$ = this.musicService.getLyric(query)
    return resData$
  }

  @Post('/purlUrl')
  getSongsUrl(@Req() req) {
    const body = req.body
    const resData$ = this.musicService.getSongsUrl(body)
    return resData$
  }
}
