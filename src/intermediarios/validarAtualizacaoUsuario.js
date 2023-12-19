const validarAtualizacaoUsuario = (schema) => async (req, res, next) => {
    const {nome_usuario, email, senha, cpf, telefone} = req.body;

    try {
        if (!nome_usuario && !email && !senha && !cpf && !telefone) {
            return res.status(400).json({mensagem: 'É necessário preencher um campo para alterar.'})
        }

        await schema.validateAsync(req.body);

        next();

    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = validarAtualizacaoUsuario