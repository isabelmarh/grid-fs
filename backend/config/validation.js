const Joi = require('joi');
const userSchema = Joi.object({
    username: Joi.string().alphanum().min(5).max(12).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().email().required(),
    repeat_password: Joi.string().equal(Joi.ref("password")).required(),
});

module.exports = {userSchema}