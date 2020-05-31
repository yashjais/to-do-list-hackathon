const Profile = require('../models/profile')
const pick = require('lodash/pick')

module.exports.show = (req, res) => {
    const user = req.user.mobile
    Profile.findOne({ user })
        .then(profile => {
            if (profile) {
                res.send(profile)
            } else {
                res.send({})
            }
        })
        .catch(err => res.send(err))
}

module.exports.create = (req, res) => {
    const body = pick(req.body, ['username', 'name', 'address', 'gender'])
    // console.log(body)
    body.user = req.user.mobile
    const profile = new Profile(body)
    profile.save()
        .then(profile => res.send(profile))
        .catch(err => res.send(err))
}

module.exports.update = (req, res) => {
    // update
    const _id = req.params.id
    const body = pick(req.body, ['username', 'name', 'address', 'gender'])
    Profile.findOneAndUpdate({ _id, user: req.user.mobile }, body, { new: true, runValidators: true })
        .then(profile => {
            if (profile) {
                res.send(profile)
            } else {
                res.send({})
            }
        })
        .catch(err => res.send(err))
}