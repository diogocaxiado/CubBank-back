const knex = require('../conexao')
const jwt = require('jsonwebtoken')

const verificaLogin = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ mensagem: 'Acesso não autorizado' })
  }

  const token = authorization.split(' ')[1]
  try {
    const { id } = jwt.verify(token, process.env.JWT_PASSWORD)

    const result = await knex('usuarios').where({ id }).select('*')
    const usuario = result[0]

    if (!usuario) {
      return res.status(404).json({ mensagem: 'Não autorizado' })
    }

    const { senha, ...dadosUsuario } = usuario
    req.usuario = dadosUsuario
    next();

  } catch (error) {
    return res.status(500).json({ mensagem: 'Não autorizado' })
  }
}

module.exports = verificaLogin
