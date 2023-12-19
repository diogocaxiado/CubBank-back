const joi = require("joi")

const schemaLogin = joi.object({
    email: joi.string().email().required().messages({
        "string.base": "O campo email deve ser uma string.",
        "any.required": "O campo email é obrigatório.",
        "string.email": "O email deve ter um formato válido.",
        "string.empty": "O campo email é obrigatório."
    }),
    senha: joi.string().min(8).required().messages({
        "string.base": "O campo senha deve ser uma string.",
        "any.required": "O campo senha é obrigatório.",
        "string.min": "A senha deve conter no mínimo 8 caracteres.",
        "string.empty": "O campo senha é obrigatório."
    })
})

module.exports = schemaLogin