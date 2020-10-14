// VALIDATION
const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(4).required(),
        password: Joi.string().min(5).required(),
        email: Joi.string().email({ minDomainSegments: 2 })
    })
    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(4).required(),
        password: Joi.string().min(5).required(),
    })
    return schema.validate(data);
}


module.exports.registerValidation = registerValidation;