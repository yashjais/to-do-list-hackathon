const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    mobile: {
        type: String,
        minlength: 10,
        maxlength: 10,
        unique: true,
        required: true,
        validate: {
            validator: function (value) {
                return validator.isNumeric(value)
            },
            message: function () {
                return 'mobile format is invalid'
            }
        }
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
                return 'email format is invalid'
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

userSchema.pre('save', function (next) {
    const user = this
    console.log('in the pre')
    if (user.isNew) {
        console.log('user is new')
        bcrypt.genSalt(10)
            .then(salt => {
                console.log(salt)
                return bcrypt.hash(user.password, salt)
            })
            .then(encPassword => {
                user.password = encPassword
                next()
            })
            .catch(err => {
                Promise.reject('gen Salt is not found')
            })
    } else {
        next()
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User