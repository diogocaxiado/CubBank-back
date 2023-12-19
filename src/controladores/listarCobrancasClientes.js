const knex = require('../conexao')

const listarCobrancasClientes = async (req, res) => {
    const { tabela } = req.body

    const clientesEmDia = [];
    const clientesInadimplentes = [];
    const cobrancasVencidas = [];
    const cobrancasPendentes = [];
    const cobrancasPagas = [];

    try {
        const filtrados = await knex(tabela)
        if (filtrados.length === 0) {
            return res.status(400).json({mensagem: 'Nenhum dado foi encontrado na base de dados.'})
        }
        if (tabela === "clientes") {
            for (const cliente of filtrados) {
                if (cliente.status === "Inadimplente") {
                    clientesInadimplentes.push(cliente)
                }
                if (cliente.status === "Em dia") {
                    clientesEmDia.push(cliente)
                }
            }
            return res.status(200).json({clientesEmDia, clientesInadimplentes})
        }
        if (tabela === "cobrancas") {
            for (const cobranca of filtrados) {
                if (cobranca.status === "Vencida") {
                    cobrancasVencidas.push(cobranca)
                }
                if (cobranca.status === "Pendente") {
                    cobrancasPendentes.push(cobranca)
                }
                if (cobranca.status === "Paga") {
                    cobrancasPagas.push(cobranca)
                }
            }
            return res.status(200).json({cobrancasPagas, cobrancasPendentes, cobrancasVencidas})
        }
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

module.exports = listarCobrancasClientes