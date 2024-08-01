import { Request, Response } from 'express';
import BlogRepository from '../repository/blog';

const blogRepository = new BlogRepository();

export const createBlog = async (req: Request, res: Response) => {
  try {
    const blog = await blogRepository.create(req.body);
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create blog' });
  }
};

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await blogRepository.findAll();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blog = await blogRepository.findById(Number(req.params.id));
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const [updatedRows, [updatedBlog]] = await blogRepository.update(Number(req.params.id), req.body);
    if (updatedRows > 0) {
      res.json(updatedBlog);
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update blog' });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const deletedCount = await blogRepository.delete(Number(req.params.id));
    if (deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog' });
  }
};

export const getBlogsByAuthor = async (req: Request, res: Response) => {
  try {
    const blogs = await blogRepository.findByAuthor(Number(req.params.authorId));
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs by author' });
  }
};