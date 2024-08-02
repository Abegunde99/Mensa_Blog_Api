import express from 'express';
import * as userController from '../controllers/user';

const router = express.Router();

router.post('/user/create', userController.createUser);
router.post('/user/login', userController.loginUser)
router.get('/user/emailOrUsername', userController.findByEmailOrUsername)
router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

export default router;