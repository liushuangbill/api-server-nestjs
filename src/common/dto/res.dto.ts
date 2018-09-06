export class ResDto {
  data: object
  code: number
  message: string

  constructor({ data = {}, code = 0, message = '' }) {
    this.data = data
    this.code = code
    this.message = message
  }
}
