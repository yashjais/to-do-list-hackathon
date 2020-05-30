const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

const userSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 128,
        required: true
    },
    username: {
        type: String,
        minlength: 5,
        unique: true
    },
    password: {
        type: String,
        unique: true,
        required: true,
        minlength: 6,
        maxlength: 128
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            },
            message: function () {
                return 'format is invalid'
            }
        }
    },
    tokens: [
        {
            token: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

const User = mongoose.model('User', userSchema)

module.exports = User