import CustomError from "../Utils/CustomError.js"

const globalErrorHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500
    // Mongoose validation Error
    if (error.name === 'ValidationError') {
        let errMsg = Object.values(error.errors).map(item => item.message).join('. ')
        errMsg = `Invalid input data: ${errMsg}`
        error = new CustomError(errMsg, 400)
    }
    // Duplicate Key Error
    if (error.code === 11000) {
        const email = error.keyValue.email
        let msg = `There is already a user with email: ${email}! please login!`
        error = new CustomError(msg, 400)
    }
    // Expired Token
    if (error.name === 'TokenExpiredError') {
        const msg = 'Token Expired. please login again.'
        error = new CustomError(msg, 401)
    }
    // JWT Error
    if (error.name === 'JsonWebTokenError') {
        const msg = 'Invalid Token. please login again.'
        error = new CustomError(msg, 401)
    }
    res.status(error.statusCode).json({
        status: 'failed',
        message: error.message
    })
}

export default globalErrorHandler