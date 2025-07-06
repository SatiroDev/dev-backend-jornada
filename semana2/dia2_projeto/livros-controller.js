// import { conexao } from './conexao.js';

// export const livrosCadastrados = async () => {
//     const [criarTabela] = await conexao.execute(
//         ` create table if not exists livros (
//             id int primary key auto_increment,
//             titulo varchar(150) not null,
//             autor varchar(150) not null,
//             ano date not null,
//             genero varchar(80) not null,
//             quantidade_estoque int not null
//         )`
//     )
//     const [tabela] = await conexao.execute(
//         'select * from livros'
//     )
//     return tabela
// }

// export const listarLivros = async(livros) => {

// }

let num = 1.12
console.log(parseInt(num))

// 💡 Desafio: Sistema de Gerenciamento de Livros (Back-End com Express + MySQL)


// ---

// 📌 Requisitos principais:

// 1. Banco de Dados: -> feito

// 2. Endpoints obrigatórios (Express):

// GET /livros: lista todos os livros ou filtra por título, autor, ano ou gênero (usando query params).

// GET /livros/:id: mostra os dados de um único livro.

// POST /livros: cadastra um novo livro.

// PUT /livros/:id: atualiza qualquer informação de um livro.

// DELETE /livros/:id: remove o livro do sistema.



// 3. Extras para nível hard (opcional):

// Adicione um campo disponível e altere automaticamente para false se quantidade_estoque for 0.

// Faça validações no cadastro (campos obrigatórios, ano numérico, etc).

// Ordenação por ano ou título (?ordenar=ano ou ?ordenar=titulo).