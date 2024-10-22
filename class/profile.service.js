const EventEmitter = require('events')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const Users = require('../model/user/userModel');
const emitter = new EventEmitter();

const salt = bcrypt.genSaltSync(10);
require('../events/logging')(emitter)
require('../events/validation/productValidation')(emitter)


class ProfileDetail {
    constructor(){
        this.user = Users
        this.Op = Sequelize.Op;

    }

   

    async forgetPass(){

    }

    async edithProfile(){

    }

    async viewProfile(){

    }
}
