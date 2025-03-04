const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp:{
        type: Number,
        required: false
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})


const user = mongoose.model('user', UserSchema)
module.exports = user