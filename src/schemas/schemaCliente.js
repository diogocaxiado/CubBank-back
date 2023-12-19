const joi = require("joi")

const schemaCliente = joi.object({
    nome_cliente: joi.string().required().messages({
        "string.base": "O campo nome do cliente deve ser uma string.",
        "any.required": "O campo nome do cliente é obrigatório.",
        "string.empty": "O campo nome do cliente é obrigatório."
    }),
    email: joi.string().email().required().messages({
        "string.base": "O campo email deve ser uma string.",
        "any.required": "O campo email é obrigatório.",
        "string.email": "O email deve ter um formato válido.",
        "string.empty": "O campo email é obrigatório."
    }),
    cpf: joi.string().min(11).max(11).required().messages({
        "string.base": "O campo cpf deve ser uma string.",
        "any.required": "O campo cpf é obrigatório.",
        "string.min": "O campo cpf deve conter 11 caracteres, somente números.",
        "string.max": "O campo cpf deve conter 11 caracteres, somente números."
    }),
    telefone: joi.number().integer().required().messages({
        "any.required": "O campo telefone é obrigatório.",
        "number.base": "O campo telefone deve conter somente números."
    }),
    cep: joi.string().min(8).max(8).messages({
        "string.base": "O campo cep deve ser uma string.",
        "string.min": "O campo cep deve conter 8 caracteres, somente números.",
        "string.max": "O campo cep deve conter 8 caracteres, somente números."
    }),
    logradouro: joi.string().messages({
        "string.base": "O campo logradouro deve ser uma string."    
    }),
    complemento: joi.string().messages({
        "string.base": "O campo complemento deve ser uma string."    
    }),
    bairro: joi.string().messages({
        "string.base": "O campo bairro deve ser uma string."    
    }),
    cidade: joi.string().messages({
        "string.base": "O campo cidade deve ser uma string."    
    }),
    estado: joi.string().min(2).max(2).messages({
        "string.base": "O campo estado deve ser uma string.",
        "string.min": "O campo estado deve conter 2 caracteres.",
        "string.max": "O campo estado deve conter 2 caracteres."    
    })
    })

module.exports = schemaCliente