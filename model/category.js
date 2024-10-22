const Sequelize = require('sequelize');
const db = require('../database/db');

const Category = db.define('category',{
    id:{
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    category_name:{
        type: Sequelize.STRING(45),
    }
},{
    timestamps: false
});

module.exports = Category