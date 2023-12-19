const knex = require("../conexao");

const atualizarCobranca = async (req, res) => {
    const { id } = req.params
    const {
        descricao,
        status,
        valor,
        vencimento
    } = req.body;

    if (!descricao || !status || !valor || !vencimento) {
        return res.status(400).json({ mensagem: "Campos obrigatórios não podem estar em branco." })
    }
    try {
        const cobranca = await knex('cobrancas').where({ id }).first()
        if (!cobranca) {
            return res.status(404).json({ mensagem: "Cobrança não encontrada." })
        }

        await knex("cobrancas").where({ id }).update({
            descricao,
            status,
            valor,
            vencimento
        })
        return res.status(200).json({ mensagem: "Cobranca atualizada com sucesso." })
    } catch (error) {
        return res.status(500).json({ Mensagem: "Erro interno do servidor" })
    }
}

module.exports = atualizarCobranca