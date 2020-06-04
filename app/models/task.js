const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tasksSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['New', 'Pending', 'Completed'],
        default: 'New'
    },
    deuDate: {
        type: Date,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Task = mongoose.model('Task', tasksSchema)

module.exports = Task