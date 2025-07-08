import express from "express";

import { registerController } from "../controller/userController.js";
import { loginController} from "../controller/userController.js";
import{getUserProfileController}from "../controller/userController.js"
import{logOutController} from "../controller/userController.js"
import { isAuth } from "../middlewares/authMiddleware.js";


// router object
const router = express.Router();


// routers
router.post("/register", registerController);

// login
router.post("/login",loginController)

// profile
router.get("/profile",isAuth, getUserProfileController)

//logout
router.post("/logout" ,logOutController )


export default router;
