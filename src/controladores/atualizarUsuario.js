const knex = require('../conexao');
const bcrypt = require('bcrypt');

const atualizarUsuario = async (req, res) => {
    const { id } = req.usuario
    const {nome_usuario, email, senha, cpf, telefone} = req.body;
    let senhaCriptografada = undefined;

    try {
        const usuarioExiste = await knex('usuarios').where({id}).first();

        if (!usuarioExiste) {
            return res.status(404).json({ mensagem: 'Usuario não encontrado' });
        }
        
        if (senha) {
            senhaCriptografada = await bcrypt.hash(senha, 10);
        }
        
        if (email && email !== req.usuario.email) {
            const emailUsuarioExiste = await knex('usuarios').where({ email }).first();
    
            if (emailUsuarioExiste) {
                return res.status(400).json({ mensagem: 'O email já existe.' });
            }
        }

        const usuarioAtualizado = {
            nome_usuario,
            email,
            senha: senhaCriptografada,
            cpf,
            telefone
        }

        await knex('usuarios').where({id}).update(usuarioAtualizado);

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor"});
    }
}

module.exports = atualizarUsuario