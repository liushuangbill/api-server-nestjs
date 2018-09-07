import {
  Module,
  NestModule,
  MiddlewareConsumer,
  Global,
  HttpModule,
} from "@nestjs/common"
import * as bodyParser from "body-parser"

import { ConsoleLog } from "common/middleware/logger.middleware"
import { limiter } from "common/utils/limt.utils"
import { MusicModules } from "music/music.modules"
import { HttpWrapService } from "common/service/http-wrap.service"

@Global()
@Module({
  imports: [HttpModule, MusicModules],
  controllers: [],
  providers: [HttpWrapService],
  exports: [HttpWrapService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ConsoleLog(), limiter, bodyParser.json()).forRoutes("/")
  }
}
