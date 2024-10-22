const Joi = require('joi');

const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
  min: 6,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};
module.exports = {
  login: Joi.object({
    username: Joi.string().required().messages({
      "any.required": `Username is required`,
      "string.empty": `Username cannot be empty`,
    }),
    password: Joi.string().required().messages({
      "any.required": `Password is required`,
      "string.empty": `Password cannot be empty`,
    }),
  }),


  validOtp: Joi.object({
    otp: Joi.number().integer().required(),
  }),

  resetPwd: Joi.object({
    otp: Joi.number().integer().required(),
    password1: passwordComplexity(complexityOptions),
    password2: Joi.ref("password1"),
  }),

  resetMyPasswordVal: Joi.object({
    old_password: Joi.string().required().messages({
      "any.required": `Old password is required`,
      "string.empty": `Old password cannot be empty`,
    }),
    password: Joi.string().min(8)
      .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .message({
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
        'string.min': 'Password must be at least 8 characters long.'
      }),
    confirm_password: Joi.valid(Joi.ref("password")).messages({
      "any.only":
        "The two Passwords: Password and Confirm password do not match",
      "any.required": "Please re-enter the password",
    }),
    userId: Joi.string().allow("").optional(),
  }),

  validateTickets: Joi.object({
    ticket_type: Joi.string().required().messages({
      "any.required": `Ticket is required`,
      "string.empty": `Ticket cannot be empty`,
    }),
    ward: Joi.string().allow("").optional(),
    number_of_ticket: Joi.number().required().messages({
      "any.required": `Number of ticket is required`,
      "string.empty": `Number of ticket cannot be empty`,
    }),
  }),

  validateItem: Joi.object({
    revenue_line: Joi.string().required().messages({
      "any.required": `Revenue line is required`,
      "string.empty": `Revenue line cannot be empty`,
    }),
    timeline: Joi.string().required().messages({
      "any.required": `Timeline is required`,
      "string.empty": `Timeline cannot be empty`,
    }),
    name: Joi.string().required().messages({
      "any.required": `Revenue item name is required`,
      "string.empty": `Revenue item name cannot be empty`,
    }),
    Amount: Joi.number().required().messages({
      "any.required": `Amount is required`,
      "string.empty": `Amount cannot be empty`,
    }),
  }),




  usersInput: Joi.object({
    email: Joi.string().email().required().messages({
      "any.required": `Email is required`,
      "string.empty": `Email cannot be empty`,
      "string.email": `Email must be a valid email`,
    }),
    surname: Joi.string().required().messages({
      "any.required": `Surname is required.`,
      "string.empty": `Surname  cannot be empty.`,
    }),
    firstname: Joi.string().required().messages({
      "any.required": `First name is required.`,
      "string.empty": `First name  cannot be empty.`,
    }),
    user_phone: Joi.string().required().messages({
      "any.required": `Phone number is required.`,
      "string.empty": `Phone number cannot be empty.`,
    }),
    password: Joi.string().min(8)
      .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .message({
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
        'string.min': 'Password must be at least 8 characters long.'
      }),
    repeat_password: Joi.ref('password'),
  }).unknown()
}