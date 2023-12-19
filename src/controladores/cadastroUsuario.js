const knex = require("../conexao");
const bcrypt = require("bcrypt")

const cadastroUsuario = async (req, res) => {
    const { nome_usuario, email, senha, cpf, telefone } = req.body;

    try {   
        const senhaCriptografada = await bcrypt.hash(senha, 10)
        await knex("usuarios").insert({nome_usuario, email, senha: senhaCriptografada, cpf, telefone})
        return res.status(201).json({mensagem: "Usuário cadastrado com sucesso."})        
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor" })
    }
}

module.exports = cadastroUsuario