const buscaEndereco = require("../util/buscaEndereco");
const knex = require("../conexao");

const cadastroCliente = async (req, res) => {
    const { nome_cliente, 
        email, 
        cpf, 
        telefone, 
        cep, 
        logradouro, 
        complemento, 
        bairro, 
        cidade, 
        estado 
    } = req.body;

    try {  
        let dadosEndereco = ""
        if (cep) {
            dadosEndereco = await buscaEndereco(cep)            
        } 
        const novoCliente = {
            nome_cliente, 
            email, 
            cpf, 
            telefone, 
            cep, 
            logradouro: logradouro || dadosEndereco.logradouro, 
            complemento: complemento || dadosEndereco.complemento, 
            bairro: bairro || dadosEndereco.bairro, 
            cidade: cidade || dadosEndereco.localidade, 
            estado: estado || dadosEndereco.uf
        }

        await knex("clientes").insert({
            nome_cliente,
            email,
            cpf,
            telefone,
            cep, 
            logradouro: novoCliente.logradouro, 
            complemento: novoCliente.complemento, 
            bairro: novoCliente.bairro, 
            cidade: novoCliente.cidade, 
            estado: novoCliente.estado,
            status: "Em dia"
        })
        
        return res.status(201).json({mensagem: "Cliente cadastrado com sucesso."})        
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor" })
    }
}

module.exports = cadastroCliente