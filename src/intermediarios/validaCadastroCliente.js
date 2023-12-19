const knex = require("../conexao");

const validarCadastroCliente = joiSchema => async (req, res, next) => {
    const { email, cpf, telefone, cep } = req.body;

    try {
        await joiSchema.validateAsync(req.body)
        const verificaEmail = await knex("clientes").where({email})
        if (verificaEmail.length) {
            return res.status(400).json({mensagem: "E-mail de cliente já cadastrado."})
        }
       
        const verificaCpf = await knex("clientes").where({cpf})
        if (verificaCpf.length) {
            return res.status(400).json({mensagem: "Cpf de cliente já cadastrado."})
        }
        for (const numero of cpf) {
            if (isNaN(numero)) {
                return res.status(400).json({mensagem: "Cpf de usuário deve conter apenas números"})
            }
        }
        
        if (telefone) {
            if (telefone.split('').length < 10) {
                return res.status(400).json({mensagem: "O campo telefone deve conter no mínimo 10 caracteres, somente números."})
            }
        }

        if (cep) {
            for (const numero of cep) {
                if (isNaN(numero)) {
                    return res.status(400).json({mensagem: "Cep de usuário deve conter apenas números"})
                }
            }  
        }

        next()
    } catch (error) {
        return res.status(400).json({mensagem: error.message })
    }
}


module.exports = validarCadastroCliente