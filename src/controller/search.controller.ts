import { Request, Response } from 'express';

import { successHandler } from '../lib/handler/httpSuccessHandler';
import ErrorHandler from '../lib/handler/httpErrorHandler';
import SearchService from 'src/service/search.service';
import Post from 'src/entity/post';

export default class PostController {
    private readonly searchService: SearchService;

    constructor() {
        this.searchService = new SearchService();
    }

    search = async(req: Request, res: Response) => {
        try {
            const keyword: string = String(req.query.keyword);
            const searchPosts: Post[] | undefined = await this.searchService.search(keyword);
            successHandler(res, 200, '검색된 게시글 전채 불러오기 성공', searchPosts);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }
}
