import { testController } from "../controller/testController.js"
import express, { Router } from 'express'

const router = express.Router()
router.get("/test",testController)


export default router