create database desafio;

create table usuarios (
      id serial primary key,
      nome_usuario text not null,
      email text not null unique,
      senha text not null,
      cpf text unique,
      telefone bigint
);

create table clientes (
      id serial primary key,
      nome_cliente text not null,
      email text unique not null,
      cpf  text unique not null,
      telefone bigint not null,
      cep text,
      logradouro text,
      complemento text,
      bairro text,
      cidade text,
      estado char(2)
);
ALTER TABLE CLIENTES ADD STATUS text;

create table cobrancas (
      id serial primary key,
      nome_cliente text not null,
      descricao text not null,
      status text not null,
      valor int not null,
      vencimento date not null,
      cliente_id int not null,
      foreign key (cliente_id) references clientes (id)
);