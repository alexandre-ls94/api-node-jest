import { Router } from 'express';
import UserController from '@controllers/UserController';
import AuthMiddleware from '@middlewares/auth';

const router = Router();

router.get('/', AuthMiddleware, UserController.index);
router.get('/:id', AuthMiddleware, UserController.show);
router.post('/', UserController.store);

export default router;