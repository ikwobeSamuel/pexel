const Joi = require('joi');

const categorySchema = Joi.object({
  category: Joi.string().required().messages({
    "any.required": `Category is required`,
    "string.empty": `Category cannot be empty`,
  }),
}).unknown()

module.exports = categorySchema;
