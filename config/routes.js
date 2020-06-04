const express = require('express')
const router = express.Router()
const usersController = require('../app/controllers/usersController')
const profilesController = require('../app/controllers/profilesController')
const tasksController = require('../app/controllers/tasksController')
const authenticateUser = require('../app/middlewares/authenticate')

router.post('/user/register', usersController.register)
router.post('/user/login', usersController.login)
router.get('/user/account', authenticateUser, usersController.account)
router.delete('/user/logout', authenticateUser, usersController.logout)

router.get('/user/profile', authenticateUser, profilesController.show)
router.post('/user/profile', authenticateUser, profilesController.create) // can only make a profile once, but can update it number of times
router.put('/user/profile/:id', authenticateUser, profilesController.update) // can update everything besides the user field

router.get('/tasks', authenticateUser, tasksController.list)
router.get('/tasks/:id', authenticateUser, tasksController.show)
router.post('/tasks', authenticateUser, tasksController.create)
router.put('/tasks/:id', authenticateUser, tasksController.update) // can update title, label, status

module.exports = router