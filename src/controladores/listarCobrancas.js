const knex = require('../conexao')

const listarCobrancas = async (req, res) => {
  try {
    const cobrancasComClienteId = await knex('cobrancas')
    const cobrancasPendentes = await knex("cobrancas").where({status: "Pendente"})
    if (cobrancasComClienteId.length < 1) {
      return res.status(404).json({mensagem: "Nenhuma cobrança encontrada."})
    }
    for (const cobranca of cobrancasPendentes) {
        if (cobranca.vencimento < new Date()) {
            await knex("cobrancas").where({id: cobranca.id}).update({status: "Vencida"})
        }
    }
    const cobrancas = [];
    for (const cobranca of cobrancasComClienteId) { 
      const {cliente_id:_, ...cobrancaSemClienteId} = cobranca
      cobrancas.push(cobrancaSemClienteId)
    }

    return res.status(200).json(cobrancas)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: 'Erro interno' })
  }
}

module.exports = listarCobrancas
