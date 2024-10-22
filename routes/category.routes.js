const express = require('express');
const category = require('../controller/category');
const middleware = require('../middlewares/middleware');
const Router = express.Router();

Router.route('/category').get(middleware.checkUser,category.viewCategory).post(category.postCategory)

Router.route('/sub-category').get(middleware.checkUser,category.viewSubCategory).post(category.postSubCategory)

module.exports = Router;