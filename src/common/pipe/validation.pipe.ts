import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException
} from "@nestjs/common"
import { plainToClass } from "class-transformer"
import { validate } from "class-validator"

@Injectable()
export class ValidationPipe implements PipeTransform {
  // value 是当前处理的参数，而 metadata 是其元数据.
  async transform(value, metdata: ArgumentMetadata) {
    // metatype表示参数的类型
    const { metatype } = metdata
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    // 根据请求的数据和其类型转换为ts class
    const object = plainToClass(metatype, value)
    // 根据dto进行验证
    const errors = await validate(object)
    if (errors.length > 0) {
      const list = []
      for (const err of errors) {
        if (err.constraints) list.push(err["property"] + " error")
      }
      throw new BadRequestException(list.toString())
    }
    return value
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return !types.find(type => type === metatype)
  }
}
