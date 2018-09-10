import { NestFactory } from "@nestjs/core"
import * as dotenv from "dotenv"

import { AppModule } from "./app.module"
import { MyLogger } from "common/service/logger.service"
import { TransformInterceptor } from "common/interceptor/transform.interceptor"
import { AnyExceptionFilter } from "common/filter/any-exception.filter"
import { ValidationPipe } from "common/pipe/validation.pipe"

// 导入配置文件
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger()
  })
  // 定义返回数据格式
  app.useGlobalInterceptors(new TransformInterceptor())
  // 异常过滤
  app.useGlobalFilters(new AnyExceptionFilter())
  // dto验证
  app.useGlobalPipes(new ValidationPipe())
  // cors
  app.enableCors()
  await app.listen(process.env.port)
}
bootstrap()
