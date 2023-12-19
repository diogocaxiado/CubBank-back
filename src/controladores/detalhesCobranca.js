const knex = require("../conexao");

const detalhesCobrancas = async (req, res) => {
  try {
    const { id } = req.params;
    const cobranca = await knex("cobrancas").where({ id }).first();

    if (!cobranca) {
      res.status(404).json({ mensagem: "Cobrança não encontrada." });
    }
    return res.status(200).json(cobranca);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno" });
  }
};

module.exports = detalhesCobrancas;
