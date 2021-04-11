import { EntityRepository, Repository } from 'typeorm';
import Category from '../entity/category';

@EntityRepository(Category)
export default class PostRepository extends Repository<Category> {
}