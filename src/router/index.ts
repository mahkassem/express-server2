import { Router } from "express"
import fileRouter from "./file.router"
import userRouter from "./user.router"

const router: Router = Router()

router.use("/file", fileRouter)
router.use("/user", userRouter)

export default router