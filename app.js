import express from "express"
import userRouter from "./Routes/userRoutes.js"
import postsRouter from "./Routes/postsRoutes.js"
import globalErrorHandler from "./Controllers/errorController.js"
import CustomError from "./Utils/CustomError.js"

const app = express()

app.use(express.json())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postsRouter)

app.use('*', (req, res, next) => {
    const err = new CustomError(`Couldn't find ${req.originalUrl} on server!`, 404)
    next(err)
})

app.use(globalErrorHandler)

export default app