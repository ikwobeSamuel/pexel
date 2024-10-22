const express  = require('express');
const adminController = require('../controller/admin.controller');
const middleware = require('../middlewares/middleware');
const Router = express.Router();

Router.route('/dashboard').get(middleware.checkUser,adminController.adminPage)


module.exports = Router;