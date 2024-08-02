import Blog from '../models/Blog';
import User from '../models/User';
import ErrorResponse from '../utils/errorResponse';
import { IBlog, IBlogData } from '../interface';

export default class BlogRepository {
  async create(blogData: Partial<Blog>): Promise<Blog> {
    try{
      const user = await User.findByPk(blogData.authorId)
      if(!user) throw new ErrorResponse("User not found", 404);
      return await Blog.create(blogData);
    }catch (error: any){
      throw new ErrorResponse(error.message, 500)
    }
  }

  async findAll(): Promise<Blog[]> {
    try{
      return await Blog.findAll();
    }catch (error: any){
      throw new ErrorResponse(error.message, 500)
    }
  }

  async findById(id: number): Promise<Blog | null> {
    try{
      return await Blog.findByPk(id);
    }catch (error: any){
      throw new ErrorResponse(error.message, 500)
    }
  }

  async update(id: number, authorId: number, blogData: Partial<Blog>): Promise<[number, Blog[]]> {
    try {
      const blog = await Blog.findByPk(id);
      if(authorId != Number(blog?.authorId)) throw new ErrorResponse("You are not authorized to update this blog", 400)
      if (!blog) throw new ErrorResponse("Blog not found", 404);
      return await Blog.update(blogData, { where: { id }, returning: true });
    }catch (error: any){
      throw new ErrorResponse(error.message, 500)
    }
  }

  async delete(id: number, authorId: number): Promise<{message: string}> {
    try {
      const blog = await Blog.findByPk(id);
      if(authorId != Number(blog?.authorId)) throw new ErrorResponse("You are not authorized to update this blog", 400)
      if (!blog) throw new ErrorResponse("Blog not found", 404);
      await Blog.destroy({ where: { id } });
      return {"message": "Blog deleted Successfully"}
    }catch (error: any){
      throw new ErrorResponse(error.message, 500)
    }
  }

  async findByAuthor(authorId: number): Promise<Blog[]> {
    try {
      const user = await User.findByPk(authorId)
      if (!user) throw new ErrorResponse("User not found", 404);
      
      return await Blog.findAll({ where: { authorId } });
    }catch (error: any){
      throw new ErrorResponse(error.message, 500)
    }
  }
}