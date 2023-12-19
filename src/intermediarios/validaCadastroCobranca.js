const validarCadastroCobranca = joiSchema => async (req, res, next) => {
    const { 
        cliente_id,
        nome_cliente, 
        descricao, 
        status, 
        valor, 
        vencimento
    } = req.body;

    function reverseString(str) {
        return str.split("/").reverse().join("-");
    }
    const vencimentoEditado = reverseString(vencimento)

    try {
        await joiSchema.validateAsync({cliente_id, nome_cliente, descricao, status, valor, vencimentoEditado})
        next()
    } catch (error) {
        return res.status(400).json({mensagem: error.message })
    }
}

module.exports = validarCadastroCobranca