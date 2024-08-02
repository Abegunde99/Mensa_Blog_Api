import Blog from '../models/blog';
import User from '../models/user';
import ErrorResponse from '../utils/errorResponse';

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

  async update(id: number, authorId: number, blogData: Partial<Blog>): Promise<Blog | null> {
    try {
      const blog = await Blog.findByPk(id);
      
      if (!blog) throw new ErrorResponse("Blog not found", 404);
      
      if (authorId !== blog.authorId) throw new ErrorResponse("You are not authorized to update this blog", 400);

      const [affectedRows] = await Blog.update(blogData, { where: { id }, returning: true });
      
      if (affectedRows === 0) throw new ErrorResponse("Please enter the right fields to update", 400);
      
      const updatedBlog = await Blog.findByPk(id);
      
      return updatedBlog;
    } catch (error: any) {
        throw new ErrorResponse(error.message, 500);
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
