import dotenv from "dotenv"
dotenv.config()
import app from "./app.js"
import mongoose from "mongoose"

const PORT = process.env.PORT

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Database connected successfully')
    }).catch((err) => {
        console.log(err.message)
    })

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message)
    console.log('Server shutting down...')
    server.close(() => {
        process.exit(1)
    })
})