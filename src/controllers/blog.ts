import { Request, Response, NextFunction } from 'express';
import BlogRepository from '../repository/blog';
import asyncHandler from '../middlewares/async';
import ErrorResponse from '../utils/errorResponse';
import { createBlogValidator, updateBlogValidator } from '../validators/blogValidators';
import { CustomRequest } from '../interface';

const blogRepository = new BlogRepository();

export const createBlog = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { error } = createBlogValidator(req.body);
  if (error) {
    return next(new ErrorResponse(error.details[0].message, 400))
  }
  if (!req.user) return next(new ErrorResponse('You are not authorized to access this route', 400));
  req.body.authorId = req.user._id;
  const blog = await blogRepository.create(req.body);
  res.status(201).json({ success: true, data: blog });
});

export const getAllBlogs = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const blogs = await blogRepository.findAll();
  res.status(200).json({ success: true, data: blogs });
});

export const getBlogById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const blog = await blogRepository.findById(Number(req.params.id));
  if (!blog) return next(new ErrorResponse('Blog not found', 404))
  res.status(200).json({ success: true, data: blog });
});

export const updateBlog = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
  if (!req.user) return next(new ErrorResponse('You are not authorized to access this route', 400));
  const authorId = req.user._id
  const [updatedRows, [updatedBlog]] = await blogRepository.update(Number(req.params.id), authorId ,req.body);
  if (updatedRows > 0) {
    res.json(updatedBlog);
  } else {
    res.status(404).json({ error: 'Blog not found' });
  }
});

export const deleteBlog = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
  if (!req.user) return next(new ErrorResponse('You are not authorized to access this route', 400));
  const authorId = req.user._id
  const { message } = await blogRepository.delete(Number(req.params.id), authorId);
  res.status(200).json({ success: true, message });
});

export const getBlogsByAuthor = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const blogs = await blogRepository.findByAuthor(Number(req.params.authorId));
  console.log({blogs})
  if (!blogs || blogs.length < 0) return next(new ErrorResponse('No Blogs found', 404))
  res.status(200).json({ success: true, data: blogs });
});