const Task = require('../models/task')
const pick = require('lodash/pick')

module.exports.list = (req, res) => {
    const user = req.user._id
    Task.find({ user })
        .then(tasks => {
            console.log('tasks', tasks)
            res.send(tasks)
        })
        .catch(err => res.send(err))
}

module.exports.show = (req, res) => {
    const user = req.user._id
    const _id = req.params.id
    Task.findOne({ _id, user })
        .then(task => {
            if (task) {
                res.send(task)
            } else {
                res.send({})
            }
        })
        .catch(err => res.send(err))
}

module.exports.create = (req, res) => {
    const body = pick(req.body, ['title', 'label', 'status', 'dueDate', 'createdAt'])
    body.user = req.user._id
    const task = new Task(body)
    task.save()
        .then(task => res.send(task))
        .catch(err => res.send(err))
}

module.exports.update = (req, res) => {
    const body = pick(req.body, ['title', 'label', 'status'])
    const _id = req.params.id
    const user = req.user._id
    console.log(body, _id, user)
    Task.findOneAndUpdate({ _id, user }, body, { new: true, runValidators: true })
        .then(task => {
            if (task) {
                res.send(task)
            } else {
                res.send({})
            }
        })
        .catch(err => res.send(err))
}