import { Router } from 'express';
import { authUser } from 'src/lib/middleware/auth.middleware';
import SearchController from '../../controller/search.controller';

const router: Router = Router();

const searchController: SearchController = new SearchController();

router.post('/', searchController.search);

export default router;