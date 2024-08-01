import express from 'express';
import * as blogController from '../controllers/blog';

const router = express.Router();

router.post('/', blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.put('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);
router.get('/author/:authorId', blogController.getBlogsByAuthor);

export default router;