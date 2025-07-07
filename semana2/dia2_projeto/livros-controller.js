import { authPlugins } from 'mysql2';
import { conexao } from './conexao.js';

export const livrosCadastrados = async () => {
    const [criarTabela] = await conexao.execute(
        ` create table if not exists livros (
            id int primary key auto_increment,
            titulo varchar(150) not null,
            autor varchar(150) not null,
            ano int not null,
            genero varchar(80) not null,
            quantidade_estoque int not null
        )`
    )
    const [tabela] = await conexao.execute(
        'select * from livros'
    )
    return tabela
}


export const consulta = async (id) => {
    const [livroConsulta] = await conexao.execute(
        `select * from livros
        where id = ?`,
        [id]
    )
    return livroConsulta
}

export const cadastrarLivro = async(titulo, autor, ano, genero, quantidade_estoque) => {
    await livrosCadastrados()
    titulo = titulo.toString()
    autor = autor.toString()
    genero = genero.toString()
    ano = parseInt(ano)
    quantidade_estoque = parseInt(quantidade_estoque)

    const [insert] = await conexao.execute(
        `insert into livros (titulo, autor, ano, genero, quantidade_estoque)
        values (?, ?, ?, ?, ?)`,
        [titulo, autor, ano, genero, quantidade_estoque]
    )
    return insert
}

export const atualizarInformacao = async (informacao, id, campo) => {
    console.log(informacao)
    console.log(id)
    console.log(campo)
    const [atualizar] = await conexao.execute(
        `update livros set (?) = ?
        where id = ?`,
        [campo,informacao,id]
    )
    console.log(atualizar)
}


// 💡 Desafio: Sistema de Gerenciamento de Livros (Back-End com Express + MySQL)


// ---

// 📌 Requisitos principais:

// 1. Banco de Dados: -> feito

// GET /livros: lista todos os livros ou filtra por título, autor, ano ou gênero (usando query params). -> feito

// GET /livros/:id: mostra os dados de um único livro. -> feito

// POST /livros: cadastra um novo livro. -> feito

// PUT /livros/:id: atualiza qualquer informação de um livro.

// DELETE /livros/:id: remove o livro do sistema.



// 3. Extras para nível hard (opcional):

// Adicione um campo disponível e altere automaticamente para false se quantidade_estoque for 0.

// Faça validações no cadastro (campos obrigatórios, ano numérico, etc).

// Ordenação por ano ou título (?ordenar=ano ou ?ordenar=titulo).