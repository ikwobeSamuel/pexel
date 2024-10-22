const express = require('express');
const AuthController = require('../controller/auth.controllers');

const Auth = express.Router()

Auth.route('/create').get(AuthController.getCreateAccount).post(AuthController.createAccount)

Auth.route('/login').get(AuthController.signInPage).post(AuthController.signIn)


module.exports = Auth