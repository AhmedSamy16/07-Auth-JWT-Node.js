import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minLength: [5, 'Name should be 5 or more charachters'],
        maxLength: [20, 'Name should be 20 or less charachters'],
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is required"],
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        trim: true,
        select: false,
        minLength: [8, 'Password should be 8 or more charachters']
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(value) {
                return this.password === value
            },
            message: 'Password and confirm password are not the same'
        }
    },
    passwordChangedAt: Date
})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) next()
    // Encrypt Password
    this.password = await bcrypt.hash(this.password, 12)
    this.confirmPassword = undefined
    next()
})

userSchema.methods.comparePassword = async function(pswd, pswdDB) {
    return await bcrypt.compare(pswd, pswdDB)
}

userSchema.methods.isPasswordChanged = async function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const pswdChangedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
        return JWTTimestamp < pswdChangedTimestamp
    }
    return false
}

const User = mongoose.model('User', userSchema)

export default User