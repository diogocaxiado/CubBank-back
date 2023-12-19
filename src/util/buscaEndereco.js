const axios = require("axios");

const buscaEndereco = async (cep) => {
    try {
       const buscaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
       return buscaCep.data
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor" })
    }
}

module.exports = buscaEndereco