const knex = require("../conexao");

const cadastroCobranca = async (req, res) => {
    const {
        cliente_id,
        nome_cliente,
        descricao,
        status,
        valor,
        vencimento
    } = req.body;

    try {
        const cliente = await knex('clientes').where({ id: cliente_id }).first()
        if (!cliente) {
            return res.status(404).json({ mensagem: "Cliente não encontrado." })
        }

        await knex("cobrancas").insert({
            cliente_id,
            nome_cliente,
            descricao,
            status,
            valor,
            vencimento
        })
        return res.status(201).json({ mensagem: "Cobranca cadastrada com sucesso." })
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}

module.exports = cadastroCobranca
