const Joi = require('joi')

const validateProductData = Joi.object({
  title: Joi.string().required().messages({
    "any.required": `title is required.`,
    "string.empty": `title  cannot be empty.`
  }),
  description: Joi.string().required().messages({
    "any.required": `description is required.`,
    "string.empty": `description  cannot be empty.`
  }),
  type: Joi.string().required().messages({
    "any.required": `type is required.`,
    "string.empty": `type  cannot be empty.`
  }),
  feature_product: Joi.number().required().messages({
    "any.required": `feature product is required.`,
    "string.empty": `feature product  cannot be empty.`
  }),
  price: Joi.number().required().messages({
    "any.required": `price  is required.`,
    "string.empty": `price   cannot be empty.`
  }),
  discount_price: Joi.number().required().messages({
    "any.required": `discount price is required.`,
    "string.empty": `discount price cannot be empty.`
  }),
  size: Joi.number().required().messages({
    "any.required": `size  is required.`,
    "string.empty": `size   cannot be empty.`
  }),
  color: Joi.string().required().messages({
    "any.required": `color  is required.`,
    "string.empty": `color   cannot be empty.`
  }),
  weight: Joi.number().required().messages({
    "any.required": `weight  is required.`,
    "string.empty": `weight   cannot be empty.`
  }),
  Qty: Joi.number().required().messages({
    "any.required": `Qty  is required.`,
    "string.empty": `Qty   cannot be empty.`
  }),
  category_id: Joi.string().required().messages({
    "any.required": `category is required.`,
    "string.empty": `category  cannot be empty.`
  }),
  sub_category_id: Joi.string().required().messages({
    "any.required": `sub category is required.`,
    "string.empty": `sub category  cannot be empty.`
  }),
  shipping: Joi.string().required().messages({
    "any.required": `shipping  is required.`,
    "string.empty": `shipping   cannot be empty.`
  }),
  barcode: Joi.string().required(),
  
  tag: Joi.string().required().messages({
    "any.required": `tag  is required.`,
    "string.empty": `tag   cannot be empty.`
  }),
}).unknown()

module.exports = { validateProductData }