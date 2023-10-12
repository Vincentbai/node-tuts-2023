const express = require('express')
const router = express.Router()

const logoutController = require('../controllers/logout.controller')

router.get('/', logoutController.handleLogout)

module.exports = router