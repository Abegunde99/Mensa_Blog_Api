import express from 'express';
import * as blogController from '../controllers/blog';
import AuthMiddleware from '../middlewares/auth';

const router = express.Router();

router.post('/blog', AuthMiddleware.authorize, blogController.createBlog);
router.get('/blogs', blogController.getAllBlogs);
router.get('/blog/:id', blogController.getBlogById);
router.put('/blog/:id', AuthMiddleware.authorize, blogController.updateBlog);
router.delete('/blog/:id', AuthMiddleware.authorize, blogController.deleteBlog);
router.get('/blog/author/:authorId', blogController.getBlogsByAuthor);

export default router;