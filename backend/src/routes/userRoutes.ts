import { Router } from "express";
import { register, login, allUsers } from '../controllers/userControllers';
import auth from "../middleware/authenticateUser";

const router = Router();

router.post('/register', register).post('/login', login);
router.get('/', auth, allUsers)

export default router;