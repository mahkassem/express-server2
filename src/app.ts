import express, { Application } from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import router from "./router"

const app: Application = express()
const port = 3000

// Middlewares
app.use(
    cors(),
    helmet(),
    morgan("dev"),
)

// Application router
app.use("/api", router)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

export default app