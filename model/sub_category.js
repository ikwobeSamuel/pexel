const Sequelize = require('sequelize');
const db = require('../database/db');
const Category = require('../model/category');

const Sub_categories = db.define('sub_categories',{
    id:{
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    category_id: Sequelize.INTEGER,

    sub_category_name:{
        type: Sequelize.STRING(45),
    }
},{
    timestamps: false
});

Category.hasMany(Sub_categories, { foreignKey: "id"})
Sub_categories.belongsTo(Category, { foreignKey: "category_id"})



module.exports = Sub_categories