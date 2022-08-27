import { Router } from "express";
import { register, login } from '../controllers/userControllers';

const router = Router();

router.post('/register', register).post('/login', login);
// router.get('/', authMiddleWare, allUsers)

export default router;