const Sequelize = require('sequelize');
const db = require('../../database/db');
const Category = require('../category');
const Sub_categories = require('../sub_category');

const Product = db.define('producties',{
    id:{
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    user_id:{
        type: Sequelize.INTEGER(11),
    }, 
    title: {
        type: Sequelize.STRING(225),
    },
    description:{
        type:Sequelize.TEXT
    },
    image:{
        type:Sequelize.STRING
    },
    type:{
        type: Sequelize.STRING(225)
    },
    feature_product:{
        type:Sequelize.TINYINT,
    },

    price:{
        type: Sequelize.FLOAT
    },
    discount_price:{
        type: Sequelize.FLOAT
    },
    size:{
        type: Sequelize.INTEGER(225)
    },
    color:{
        type: Sequelize.STRING(225)
    },
    weight:{
        type: Sequelize.FLOAT
    },
    Qty:{
        type: Sequelize.INTEGER(11)
    },
    category_id: {
        type: Sequelize.INTEGER
    },
    sub_category_id: {
        type: Sequelize.INTEGER
    },
    shipping:{
        type: Sequelize.STRING(225)
    },
    barcode:{
        type: Sequelize.STRING(225)
    },
    tag:{
        type: Sequelize.TEXT
    },
    created_at:{
        type: Sequelize.DATE
    }
},{
    timestamps: false
});

Category.hasMany(Sub_categories, { foreignKey: 'category_id' });
Sub_categories.belongsTo(Category, { foreignKey: 'category_id' });
Sub_categories.hasMany(Product, { foreignKey: 'sub_category_id' });
Product.belongsTo(Sub_categories, { foreignKey: 'sub_category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Product