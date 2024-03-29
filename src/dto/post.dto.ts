import { Length, validate } from 'class-validator';
import HttpError from '../error/httpError';

export default class PostDTO {
  @Length(1, 50)
  readonly title!: string;

  @Length(1, 2000)
  readonly content!: string;

  readonly image?: string;

  readonly userEmail!: string;

  constructor(body: PostDTO) {
    this.title = body.title;
    this.content = body.content;
    this.image = body.image;
    this.userEmail = body.userEmail;
  }

  async validate(): Promise<void> {
    const errors = await validate(this);

    if (errors.length > 0) {
      throw new HttpError(400, '재목 또는 내용의 글자를 초과했습니다.');
    }
  }
}