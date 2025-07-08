import { conexao } from "./conexao.js"
import bcrypt from 'bcrypt'


export const usuarios = async () => {
    const [criar_tabela] = await conexao.execute(
        `create table if not exists usuarios (
            id int primary key auto_increment,
            nome varchar(200) not null,
            senha varchar(255) not null
        )`
    )
    const [tabela] = await conexao.execute(
        'select * from usuarios'
    )
    return tabela
} 

export const cadastrarUser = async (nome, senha) => {
    await usuarios()
    const senhaHash = await bcrypt.hash(senha, 10)

    const [insert] = await conexao.execute(
        `insert into usuarios (nome, senha)
        values (?, ?)`,
        [nome, senhaHash]
    )
    console.log(insert)
    return insert
}

export const senhaCompare = async (nome, senha) => {
    const users = await usuarios()
    for (let i = 0; i < users.length; i++) {
        let usuario = users[i]
        if (usuario.nome === nome) {
            const verificacaoSenha = await bcrypt.compare(senha, usuario.senha)
            if (verificacaoSenha) {
                return true
            }
        }
    }
    return false
} 



// 🔐 Desafio — Autenticação com JWT e Banco de Dados
// 🎯 Objetivo:
// Criar um sistema de autenticação com login e rotas protegidas, onde os dados dos usuários estão salvos em um banco de dados MySQL.

// 🔧 Requisitos Técnicos:
// 🗃️ Banco de dados (MySQL):
// Crie uma tabela chamada usuarios com os campos: ----

// id (int, primary key, auto_increment)----

// nome (varchar)----

// senha (varchar)----

// 📥 Rotas:
// POST /login

// Recebe nome e senha no body

// Verifica se o usuário existe no banco

// Se estiver correto, gera e retorna um JWT

// GET /perfil

// Rota protegida por middleware

// Requer token no header Authorization

// Retorna o nome e o id do usuário autenticado

// (Bônus) POST /cadastro

// Permite criar novos usuários (salva no banco)

// A senha deve ser criptografada com bcrypt

// 🧪 Dicas:
// Use jsonwebtoken, mysql2 e bcrypt

// Teste com Postman (Authorization → Bearer Token)

// Use express.json() e organize bem os arquivos (ex: conexao.js, auth-controller.js, etc.)

