import { Length, validate } from 'class-validator';
import HttpError from '../error/httpError';

export default class SignUpDTO {
  @Length(2, 100)
  readonly name!: string;

  @Length(2, 100)
  readonly email!: string;

  @Length(2, 100)
  readonly pw!: string;
  
  constructor(body: SignUpDTO) {
    this.name = body.name;
    this.email = body.email;
    this.pw = body.pw;
  }
  
  async validate(): Promise<void> {
    const errors = await validate(this);
  
    if (errors.length > 0) {
      throw new HttpError(400, '검증 오류');
    }
  }
}