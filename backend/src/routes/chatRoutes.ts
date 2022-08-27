import { Router } from "express";
import { accessChat } from "../controllers/chatControllers";
import auth from "../middleware/authenticateUser";


const router = Router();

router.route('/').post(auth, accessChat);
// router.route('/').get(auth, fetchChats);
// router.route('/group').post(auth, createGroupChat);
// router.route('/rename').patch(auth, renameGroup);
// router.route('/groupremove').patch(auth, removeFromGroup);
// router.route('/groupadd').patch(auth, addToGroup);

export default router;