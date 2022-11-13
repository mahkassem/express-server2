import { Router } from "express"
import authRouter from "./auth.router"
import fileRouter from "./file.router"
import studentRouter from "./student.router"
import userRouter from "./user.router"

const router: Router = Router()

router.use("/auth", authRouter)
router.use("/files", fileRouter)
router.use("/user", userRouter)
router.use("/student", studentRouter)

export default router