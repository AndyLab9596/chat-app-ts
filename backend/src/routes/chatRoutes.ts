import { Router } from "express";
import { accessChat, createGroupChat, fetchChats, renameGroup, addToGroup, removeFromGroup } from "../controllers/chatControllers";
import auth from "../middleware/authenticateUser";


const router = Router();

router.route('/').post(auth, accessChat);
router.route('/').get(auth, fetchChats);
router.route('/group').post(auth, createGroupChat);
router.route('/rename').put(auth, renameGroup);
router.route('/groupremove').put(auth, removeFromGroup);
router.route('/groupadd').put(auth, addToGroup);

export default router;