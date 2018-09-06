import { Module } from "@nestjs/common";
import { MusicService } from "./music.service";
import { MusicController } from "./music.controller";

@Module({
  imports: [],
  providers: [MusicService],
  controllers: [MusicController],
})
export class MusicModules { }
