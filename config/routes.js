const express = require('express')
const router = express.Router()
const usersController = require('../app/controllers/usersController')
const profilesController = require('../app/controllers/profilesController')
const authenticateUser = require('../app/middlewares/authenticate')

router.post('/user/register', usersController.register)
router.post('/user/login', usersController.login)
router.get('/user/account', authenticateUser, usersController.account)
router.delete('/user/logout', authenticateUser, usersController.logout)

router.get('/user/profile', authenticateUser, profilesController.show)
router.post('/user/profile', authenticateUser, profilesController.create) // can only make a profile once, but can update it number of times
router.put('/user/profile/:id', authenticateUser, profilesController.update) // can update everything besides the user field

module.exports = router