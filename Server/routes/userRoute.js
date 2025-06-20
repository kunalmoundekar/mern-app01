import express from "express";

import { registerController } from "../controller/userController.js";
import { loginController} from "../controller/userController.js";

// router object
const router = express.Router();


// routers
router.post("/register", registerController);

router.post("/login",loginController)


export default router;
