const express = require('express')
const router = express.Router()
const usersController = require('../app/controllers/usersController')

router.post('/user/register', usersController.register)
router.post('/user/login', usersController.login)

module.exports = router