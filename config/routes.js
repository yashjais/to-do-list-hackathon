const express = require('express')
const router = express.Router()
const usersController = require('../app/controllers/usersController')
const authenticateUser = require('../app/middlewares/authenticate')

router.post('/user/register', usersController.register)
router.post('/user/login', usersController.login)
router.get('/user/account', authenticateUser, usersController.account)

module.exports = router