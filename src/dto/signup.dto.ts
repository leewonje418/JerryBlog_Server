import { Length, validate } from 'class-validator';
import HttpError from '../error/httpError';

export default class SignUpRequest {
  @Length(2, 100)
  readonly name: string;

  @Length(2, 100)
  readonly email: string;

  @Length(2, 100)
  readonly password: string;
  
  constructor(body: SignUpRequest) {
    this.name = body.name;
    this.email = body.email;
    this.password = body.password;
  }
  
  async validate(): Promise<void> {
    const errors = await validate(this);
  
    if (errors.length > 0) {
      throw new HttpError(400, '검증 오류');
    }
  }
}