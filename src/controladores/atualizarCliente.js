const knex = require('../conexao')
const validaCadastroCliente = require('../intermediarios/validaCadastroCliente')
const schemaCliente = require('../schemas/schemaCliente')

const atualizarDadosCliente = async (req, res) => {
  const {
    nome_cliente,
    email,
    cpf,
    cep,
    logradouro,
    complemento,
    bairro,
    cidade,
    estado,
  } = req.body
  const { id } = req.params


const cliente = await schemaCliente.validate(req.body)

if (!cliente) {
  return res.status(400).json({ mensagem: 'Dados do cliente inválidos' })
}

try {
  await knex('clientes').where({ id }).update({
    nome_cliente,
    email,
    cpf,
    cep,
    logradouro,
    complemento,
    bairro,
    cidade,
    estado,
  })
  return res
    .status(200)
    .json({ mensagem: 'Dados do cliente atualizado com sucesso' })
} catch (error) {
  return res
    .status(500)
    .json({ mensagem: 'Ocorreu um erro ao processar a solicitação' })
  }
}

module.exports = atualizarDadosCliente
