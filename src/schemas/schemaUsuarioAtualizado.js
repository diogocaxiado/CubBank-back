const joi = require('joi');

const schemaUsuarioAtualizado = joi.object({
    nome_usuario: joi.string().messages({
        "string.base": "O campo nome_usuario deve ser uma string."
    }),
    email: joi.string().email().messages({
        "string.email": "O email deve ter um formato válido."
    }),
    senha: joi.string().min(8).messages({
        "string.min": "A senha deve conter no mínimo 8 caracteres."
    }),
    cpf: joi.string().min(11).max(11).messages({
        "string.min": "O campo cpf deve conter 11 caracteres, somente números.",
        "string.max": "O campo cpf deve conter 11 caracteres, somente números."
    }),
    telefone: joi.number().integer().messages({
        "number.base": "O campo telefone deve conter somente números."
    })
})

module.exports = schemaUsuarioAtualizado