import express from "express"
import { userLogin, userRegister } from "../controllers/authController.js";

const router = express();

router.route('/login').post(userLogin);
router.route('/register').post(userRegister);

export default router;