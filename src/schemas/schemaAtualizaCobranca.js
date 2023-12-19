const joi = require("joi")

const schemaAtualizaCobranca = joi.object({
    descricao: joi.string().required().messages({
        "string.base": "O campo descrição deve ser uma string.",
        "any.required": "O campo descrição é obrigatório.",
        "string.empty": "O campo descrição é obrigatório."
    }),
    status: joi.string().required().messages({
        "string.base": "O campo status deve ser uma string.",
        "any.required": "O campo status é obrigatório.",
        "string.empty": "O campo status é obrigatório."
    }),
    valor: joi.number().positive().required().messages({
        "any.required": "O campo valor é obrigatório.",
        "number.base": "O campo valor deve conter somente números.",
        "number.positive": "O valor deve ser um número positivo"
    }),
    vencimentoEditado: joi.date().min("now").required().messages({
        "any.required": "O campo vencimento é obrigatório.",
        "date.base": "Formato de data inválido, DD/MM/AAAA",
        "date.format": "Formato de data inválido, DD/MM/AAAA.",
        "date.min": "O campo data deve ser uma data futura."
    })
    })

module.exports = schemaAtualizaCobranca