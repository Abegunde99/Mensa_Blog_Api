import Blog from '../models/Blog';
import { IBlog, IBlogData } from '../interface';

export default class BlogRepository {
  async create(blogData: Partial<Blog>): Promise<Blog> {
    return await Blog.create(blogData);
  }

  async findAll(): Promise<Blog[]> {
    return await Blog.findAll();
  }

  async findById(id: number): Promise<Blog | null> {
    return await Blog.findByPk(id);
  }

  async update(id: number, blogData: Partial<Blog>): Promise<[number, Blog[]]> {
    return await Blog.update(blogData, { where: { id }, returning: true });
  }

  async delete(id: number): Promise<number> {
    return await Blog.destroy({ where: { id } });
  }

  async findByAuthor(authorId: number): Promise<Blog[]> {
    return await Blog.findAll({ where: { authorId } });
  }
}