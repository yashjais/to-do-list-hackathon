const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    }
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile