
const express = require('express');
const router = express.Router();
const userController = require('../controller/auth.controller')


/* GET users listing. */
router.post('/signup', userController.Signup)
router.post('/login', userController.login)

module.exports = router;
