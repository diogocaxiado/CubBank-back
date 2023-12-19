const knex = require('../conexao')

const buscarCobrancas = async (req, res) => {
    const {campo} = req.query
    let campoForNumero = isNaN(campo * 1) ? false : true;    

    try {   
        if(campoForNumero) {
            const cobrancasPorId = await knex('cobrancas').where('id', campo);
            return res.json(cobrancasPorId);
        } 

        if(!campoForNumero) {
            const cobrancasPorCliente = await knex('cobrancas').whereILike('nome_cliente', `%${campo}%`);
            return res.json(cobrancasPorCliente);
        } 
            
        return res.status(400).json({mensagem: 'Formato inválido.'});
            
        } catch (error) {
            return res.status(500).json({mensagem: 'Erro interno no servidor.'}) 
        }
}

module.exports = buscarCobrancas