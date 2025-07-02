// Parte 1: Simulação de login com dados fixos

// let usuarioSalvo = {
//     nome: 'admin',
//     senha: '1234'
// }

// Função de login

// function login(nomeDigitado, senhaDigitada) {
//     if (nomeDigitado === usuarioSalvo.nome && senhaDigitada === usuarioSalvo.senha){
//         console.log('Login realizado com sucesso!')
//     }
//     else {
//         console.log('Usuário ou senha inválidos.')
//     }
// }

// login('admin', '1234')
// login('admin', 'errado')
// login('hacker', '1234')

// Parte 2: Separar arquivo

// arquivo -> dia5_usuario.js

// const usuario = require('./dia5_usuario')    

// function login(nome, senha) {
//     if (nome === usuario.nome && senha === usuario.senha) {
//         console.log('Login realizado com sucesso!')
//     }
//     else {
//         console.log('Usuário ou senha inválidos.')
//     }
// }

// login('admin', '1234')

// DESAFIO PRÁTICO DO DIA 5

// Crie um dia5.js com:

// Um usuário salvo

// Uma função de login com nome e senha como parâmetros

// Simule 3 tentativas de login diferentes (1 certa, 2 erradas

const user = require('./dia5_desafio_usuario')


function login(nome, senha) {
    if (nome === user.nome && senha === user.senha) {
        console.log('Login realizado com sucesso!!!')
    }
    else {
        console.log('Falha no login! Usuário ou senha inválidos.')
    }
}


let teste_users = [
    {nome: 'lucas', senha: '1234'},
    {nome: 'jose', senha: '7711'},
    {nome: 'maria', senha: '0000'}
]

for (let i = 0; i < teste_users.length; i ++) {
    let usuario_teste = teste_users[i]
    login(usuario_teste.nome, usuario_teste.senha)
    console.log()
}