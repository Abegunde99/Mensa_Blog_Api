import express from 'express';
import * as blogController from '../controllers/blog';

const router = express.Router();

router.post('/blog', blogController.createBlog);
router.get('/blogs', blogController.getAllBlogs);
router.get('/blog/:id', blogController.getBlogById);
router.put('/blog/:id', blogController.updateBlog);
router.delete('/blog/:id', blogController.deleteBlog);
router.get('/blog/author/:authorId', blogController.getBlogsByAuthor);

export default router;