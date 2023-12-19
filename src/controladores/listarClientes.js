const knex = require('../conexao')

const listarClientes = async (req, res) => {
  try {
    const clientes = await knex('clientes')

    if (clientes.length === 0) {
      return res
        .status(400)
        .json('Nenhum cliente foi encontrado na base de dados')
    }
    
    await knex('clientes').update({status: 'Em dia'})
    
    const cobrancasVencidas = await knex('cobrancas')
      .join('clientes', 'cobrancas.cliente_id', 'clientes.id')
      .where('cobrancas.status', 'Vencida')
    for (const cobranca of cobrancasVencidas) {
      await knex("clientes").where({ id: cobranca.cliente_id }).update({ status: "Inadimplente" })
    }
    return res.status(200).json(clientes)
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ mensagem: 'Ocorreu um erro ao processar a solicitação' })
  }
}

module.exports = listarClientes