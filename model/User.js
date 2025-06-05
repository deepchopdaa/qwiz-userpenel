const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 0
    }
}, { timestamps: true, versionKey: false })

const User = mongoose.model("Admin", UserSchema)
module.exports = User