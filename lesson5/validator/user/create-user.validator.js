const Joi = require('joi');

const { regexpEnum } = require('../../constant');

module.exports = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(4)
        .max(25)
        .required(),
    password: Joi.string().regex(regexpEnum.PASSWORD_REGEXP).required(),
    email: Joi.string().regex(regexpEnum.EMAIL_REGEXP).required(),
    age: Joi.number().integer().min(10).max(120)
});
