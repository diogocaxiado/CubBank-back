const express = require("express");

const cadastroUsuario = require("./controladores/cadastroUsuario");
const validarCadastroUsuario = require("./intermediarios/validarCadastroUsuario");
const schemaUsuario = require("./schemas/schemaUsuario");

const loginUsuario = require("./controladores/loginUsuario");
const verificaLogin = require("./intermediarios/verificaLogin");

const atualizarUsuario = require("./controladores/atualizarUsuario");
const validarAtualizacaoUsuario = require("./intermediarios/validarAtualizacaoUsuario");
const schemaUsuarioAtualizado = require("./schemas/schemaUsuarioAtualizado");

const cadastroCliente = require("./controladores/cadastroCliente");
const validarCadastroCliente = require("./intermediarios/validaCadastroCliente");
const detalheCliente = require("./controladores/detalheCliente");
const listarClientes = require('./controladores/listarClientes')
const schemaCliente = require("./schemas/schemaCliente");

const cadastroCobranca = require("./controladores/cadastroCobranca");
const validarCadastroCobranca = require("./intermediarios/validaCadastroCobranca");
const listarCobrancas = require("./controladores/listarCobrancas");
const deletarCobranca = require("./controladores/deletarCobranca");
const schemaCobranca = require("./schemas/schemaCobranca");
const atualizarCobranca = require("./controladores/atualizarCobranca");
const buscarCobrancas = require("./controladores/buscarCobrancas");
const buscarClientes = require('./controladores/buscarClientes');
const validaAtualizarCobranca = require("./intermediarios/validaAtualizarCobranca");
const schemaAtualizaCobranca = require("./schemas/schemaAtualizaCobranca");
const listarCobrancasClientes = require("./controladores/listarCobrancasClientes");

const atualizarCliente = require("./controladores/atualizarCliente");

const detalhesCobrancas = require("./controladores/detalhesCobranca");

const rotas = express();

rotas.post(
  "/cadastrousuario",
  validarCadastroUsuario(schemaUsuario),
  cadastroUsuario
);
rotas.post("/loginusuario", loginUsuario);

rotas.use(verificaLogin);

rotas.put(
  "/atualizarusuario",
  validarAtualizacaoUsuario(schemaUsuarioAtualizado),
  atualizarUsuario
);

rotas.post(
  "/cadastrocliente",
  validarCadastroCliente(schemaCliente),
  cadastroCliente
);
rotas.get("/detalhecliente/:id", detalheCliente);
rotas.get("/listarclientes", listarClientes)

rotas.post(
  "/cadastrocobranca",
  validarCadastroCobranca(schemaCobranca),
  cadastroCobranca
);
rotas.get("/listarcobrancas", listarCobrancas);
rotas.get("/detalhecobranca/:id", detalhesCobrancas);

rotas.get("/listarclientes", listarClientes);
rotas.put("/atualizarcliente/:id", atualizarCliente);

rotas.delete("/deletarcobranca/:id", deletarCobranca);

rotas.put("/atualizarcobranca/:id", validaAtualizarCobranca(schemaAtualizaCobranca), atualizarCobranca);

rotas.get("/buscarclientes", buscarClientes)
rotas.get("/buscarcobrancas", buscarCobrancas)
rotas.post("/listarcobrancasclientes", listarCobrancasClientes)

rotas.get('/listarclientes', listarClientes);

module.exports = rotas;
