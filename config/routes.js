const express = require('express')
const router = express.Router()
const usersController = require('../app/controllers/usersController')

router.get('/user/register', usersController.register)

module.exports = router