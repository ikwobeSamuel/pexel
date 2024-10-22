const express = require('express')
const homeControllers = require('../controller/home.controllers')
const middleware = require('../middlewares/middleware')
const Home = express.Router()

Home.get('/', middleware.checkUser,  homeControllers.homePageGet)

module.exports = Home