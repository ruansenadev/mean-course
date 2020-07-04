const express = require('express')
const usersController = require('../controllers/usersController')
const router = express.Router()
const cors = require('cors')
router.use(cors())

router.post('/signup', usersController.createUser)
router.post('/login', usersController.login)

module.exports = router
