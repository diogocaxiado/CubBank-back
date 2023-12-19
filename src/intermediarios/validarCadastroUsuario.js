const knex = require("../conexao");

const validarCadastroUsuario = joiSchema => async (req, res, next) => {
    const { email, cpf, telefone } = req.body;

    try {
        await joiSchema.validateAsync(req.body)
        const verificaEmail = await knex("usuarios").where({email})
        if (verificaEmail.length) {
            return res.status(400).json({mensagem: "E-mail de usuário já cadastrado"})
        }
        if (cpf) {
            const verificaCpf = await knex("usuarios").where({cpf})
            if (verificaCpf.length) {
                return res.status(400).json({mensagem: "Cpf de usuário já cadastrado"})
            }
            for (const numero of cpf) {
                if (isNaN(numero)) {
                    return res.status(400).json({mensagem: "Cpf de usuário deve conter apenas números"})
                }
            }
        }
        if (telefone) {
            if (telefone.split('').length < 10) {
                return res.status(400).json({mensagem: "O campo telefone deve conter no mínimo 10 caracteres, somente números."})
            }
        }
        next()
    } catch (error) {
        return res.status(400).json({mensagem: error.message })
    }
}



module.exports = validarCadastroUsuario