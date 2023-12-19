const bcrypt = require('bcrypt')
const knex = require('../conexao')
const jwt = require('jsonwebtoken')

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body
  
  try {
    if (!email || !senha) {
      return res.status(400).json({mensagem: 'É obrigatório email e senha.'})
    }
    
    const result = await knex('usuarios').where({ email })
    const usuario = result[0]

    if (!usuario) {
      return res.status(400).json({ mensagem: 'Email não encontrado' })
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

    if (!senhaCorreta) {
      return res.status(400).json({ mensagem: 'Email ou senha está incorreto' })
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_PASSWORD, { expiresIn: '8h' })

    return res.json({
      usuario,
      token,
    })
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno' })
  }
}

module.exports = loginUsuario

