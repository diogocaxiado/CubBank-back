const joi = require("joi")

const schemaUsuario = joi.object({
    nome_usuario: joi.string().required().messages({
        "string.base": "O campo nome_usuario deve ser uma string.",
        "any.required": "O campo nome_usuario é obrigatório.",
        "string.empty": "O campo nome_usuario é obrigatório."
    }),
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
    }),
    cpf: joi.string().min(11).max(11).messages({
        "string.base": "O campo cpf deve ser uma string.",
        "string.min": "O campo cpf deve conter 11 caracteres, somente números.",
        "string.max": "O campo cpf deve conter 11 caracteres, somente números."
    }),
    telefone: joi.number().integer().messages({
        "number.base": "O campo telefone deve conter somente números."
    })
})

module.exports = schemaUsuario