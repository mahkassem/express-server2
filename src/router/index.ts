import { Router } from "express"
import authRouter from "./auth.router"
import fileRouter from "./file.router"
import userRouter from "./user.router"

const router: Router = Router()

router.use("/auth", authRouter)
router.use("/files", fileRouter)
router.use("/user", userRouter)

export default router