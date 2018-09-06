import { Injectable, PipeTransform, Pipe, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value, metdata: ArgumentMetadata) {
    const { metatype } = metdata
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      const list = []
      for (const err of errors) {
        if (err.constraints) list.push(err['property'] + ' error')
      }
      throw new BadRequestException(list.toString())
    }
    return value
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return !types.find((type) => type === metatype)
  }
}
