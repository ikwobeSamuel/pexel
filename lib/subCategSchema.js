const Joi = require('joi');

const SubCategorySchema = Joi.object({
  category: Joi.string().required().messages({
    "any.required": `Category is required`,
    "string.empty": `Category cannot be empty`,
  }),
  sub_category: Joi.string().required().messages({
    "any.required": `Sub Category is required`,
    "string.empty": `Sub Category cannot be empty`,
  }),
}).unknown()

module.exports = SubCategorySchema;
