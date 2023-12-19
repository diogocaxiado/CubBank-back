const knex = require('../conexao')

const detalheCliente = async (req, res) => {
  try {
    const { id } = req.params
    const clienteEncontrado = await knex('clientes').where({ id }).first()

    if (!clienteEncontrado) {
        res.status(404).json({mensagem: "Cliente não encontrado."}) 
    }
    return res.status(200).json({ clienteEncontrado })
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno' })
  }
}

module.exports = detalheCliente

