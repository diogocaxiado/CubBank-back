const knex = require('../conexao')

const deletarCobranca = async (req, res) => {
    const { id } = req.params;

    try {
        const dataAtual = new Date().toISOString().split('T')[0];
        const cobranca = await knex('cobrancas').where('id', id).first();

        if (!cobranca) {
            return res.status(404).json({ mensagem: 'Cobrança não encontrada' });
        }

        if (cobranca.status !== 'Pendente') {
            return res.status(400).json({ mensagem: 'A cobrança não está pendente e não pode ser excluída' });
        }

        if (cobranca.vencimento <= dataAtual) {
            return res.status(400).json({ mensagem: 'A cobrança não pode ser excluída porque já venceu' });
        }
        await knex('cobrancas').where('id', id).del();
        res.status(200).json({ mensagem: 'Cobrança excluída com Sucesso' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    } 
};

module.exports = deletarCobranca;