const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
    // console.log('in the pre')
    if (user.isNew) {
        // console.log('user is new')
        bcrypt.genSalt(10)
            .then(salt => {
                // console.log(salt)
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

userSchema.statics.findByCredentials = function (email, password) {
    const User = this
    return User.findOne({ email }) // findOne returns a query - but the error kept going in the err even when promise is resolved // do a 'user not found-err' in the catch
        .then(user => {
            if (!user) {
                return Promise.reject('invalid email/password')
            } else {
                return bcrypt.compare(password, user.password)
                    .then(result => {
                        if (result) {
                            return Promise.resolve(user)
                        } else {
                            return Promise.reject('invalid email/password')
                        }
                    })
                    .catch(err => Promise.reject(err))
            }
        })
        .catch(err => Promise.reject(err))
}

userSchema.methods.generateToken = function () {
    // console.log('in the genrateToken')
    const user = this
    const tokenData = {
        _id: user._id,
        mobile: user.mobile,
        createdAt: Number(new Date())
    }
    // console.log('tokenData', tokenData)
    const token = jwt.sign(tokenData, 'jwt@123')
    // console.log('token', token)
    user.tokens.push({ token })
    return user.save()
        .then(user => Promise.resolve(token))
        .catch(err => Promise.reject(err))
}

const User = mongoose.model('User', userSchema)

module.exports = User