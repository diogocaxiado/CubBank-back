const knex = require('../conexao')

const buscarClientes = async (req, res) => {
    const {campo} = req.query
    let isNumber = isNaN(campo * 1) ? false : true;    

    try {   
        if(isNumber) {
            const cobrancasPorCpf = await knex('clientes').where('cpf', campo);
            return res.json(cobrancasPorCpf);
        } 

        if(!isNumber) {
            const cobrancasPorNomeCliente = await knex('clientes').whereILike('nome_cliente', `%${campo}%`).orWhere('email', campo);
            return res.json(cobrancasPorNomeCliente);
        } 
            
        return res.status(400).json({mensagem: 'Formato inválido.'});
            
        } catch (error) {
            return res.status(500).json({mensagem: 'Erro interno no servidor.'}) 
        }
}

module.exports = buscarClientes