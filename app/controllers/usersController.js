const User = require('../models/user')
const pick = require('lodash/pick')

module.exports.register = (req, res) => {
    console.log('in register', req.body)
    const body = pick(req.body, ['mobile', 'email', 'password'])
    console.log(body)
    const user = new User(body)
    user.save()
        .then(user => {
            console.log(user)
            res.send(pick(user, ['_id', 'mobile', 'email']))
        })
        .catch(err => res.send(err))
}

module.exports.login = (req, res) => {
    console.log('in the login', req.body)
    const body = pick(req.body, ['email', 'password'])
    console.log(body)
    User.findByCredentials(body.email, body.password)
        .then(user => {
            // res.send(user)
            return user.generateToken()
        })
        .then(token => res.send(token))
        .catch(err => {
            // res.status('401').send('invalid email or password')
            res.send(err)
        })
}