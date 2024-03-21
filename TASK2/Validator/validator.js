const joi = require("joi")


const contactSchema = joi.object({
    name : joi.string().min(3).required(),
    phone : joi.string().min(8).required(),
    email : joi.string().email().required(),
})

const contactValidator = (body) => contactSchema.validate(body)

module.exports = { contactValidator }