import { Length, validate } from 'class-validator';
import HttpError from '../error/httpError';

export default class commentDTO {
  @Length(1, 500)
  readonly content!: string;

  readonly userEmail!: string;

  readonly postIdx!: number;  

  constructor(body: commentDTO) {
    this.content = body.content;
    this.userEmail = body.userEmail;
    this.postIdx = body.postIdx;
  }

  async validate(): Promise<void> {
    const errors = await validate(this);

    if (errors.length > 0) {
      throw new HttpError(400, '검증 오류');
    }
  }
}