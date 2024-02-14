import express from "express"
import { loadUser, userLogOut, userLogin, userRegister } from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express();

router.route('/login').post(userLogin);
router.route('/register').post(userRegister);
router.route('/me').get(isAuthenticated , loadUser);
router.route('/logout').delete(isAuthenticated , userLogOut);

export default router;