import { Request, Response, NextFunction } from 'express';
import BlogRepository from '../repository/blog';
import asyncHandler from '../middlewares/async';
import ErrorResponse from '../utils/errorResponse';
import { createBlogValidator, updateBlogValidator } from '../validators/blogValidators';

const blogRepository = new BlogRepository();

export const createBlog = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { error } = createBlogValidator(req.body);
  if (error) {
    console.log(error);
  }
  const blog = await blogRepository.create(req.body);
  res.status(201).json({success: true, data: blog});
});

export const getAllBlogs = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const blogs = await blogRepository.findAll();
  res.status(200).json({ success: true, data: blogs });
});

export const getBlogById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const blog = await blogRepository.findById(Number(req.params.id));
  if(!blog) return next(new ErrorResponse('Blog not found', 404))
});

export const updateBlog = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const [updatedRows, [updatedBlog]] = await blogRepository.update(Number(req.params.id), req.body);
  if (updatedRows > 0) {
    res.json(updatedBlog);
  } else {
    res.status(404).json({ error: 'Blog not found' });
  }
});

export const deleteBlog = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const deletedCount = await blogRepository.delete(Number(req.params.id));
  if (deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Blog not found' });
  }
});

export const getBlogsByAuthor = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const blogs = await blogRepository.findByAuthor(Number(req.params.authorId));
  res.json(blogs);
});