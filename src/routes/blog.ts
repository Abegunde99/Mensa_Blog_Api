import express from 'express';
import * as blogController from '../controllers/blog';
import AuthMiddleware from '../middlewares/auth';

const router = express.Router();

router.post('/posts', AuthMiddleware.authorize, blogController.createBlog);
router.get('/posts', blogController.getAllBlogs);
router.get('/posts/:id', blogController.getBlogById);
router.put('/posts/:id', AuthMiddleware.authorize, blogController.updateBlog);
router.delete('/posts/:id', AuthMiddleware.authorize, blogController.deleteBlog);
router.get('/posts/author/:authorId', blogController.getBlogsByAuthor);

export default router;