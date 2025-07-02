

// !nome -> verifica se nome não foi definido
// nome.trim() === '' ->  remove os espaços do começo e do fim da string.

// Parte 1: Validação de dados simples
// function validarCadastro(nome, senha) {
//     if (!nome || nome.trim() === '') {
//         console.log('Nome inválido.')
//         return false
//     }

//     if (!senha || senha.length < 4) {
//         console.log('Senha deve ter no mínimo 4 caracteres.')
//         return false
//     }

//     return true
// }

// validarCadastro('jose', '123')

// Parte 2: Instalando bcrypt (para proteger senhas)

// npm init -y
// npm install bcrypt

//  Parte 3: Protegendo senhas com bcrypt


//  Gerar o hash da senha (no "cadastro"):
// const bcrypt = require('bcrypt')

// let senhaOriginal = '1234'
// bcrypt.hash(senhaOriginal, 10, function(err, hash) {
//     console.log('Senha criptografia:', hash)
// })

// // Verificar senha no "login":
// let senhaDigitada = '1234'
// let senhaSalva = "$2b$10$uXyO2c3wR7hfjK2Gx0wZPe8cCfjKdOEGZ4QOqFUZ3zUwo0QYHHhQa"

// bcrypt.compare(senhaDigitada, senhaSalva, function(err, result) {
//     if (result) {
//         console.log('Login OK')
//     }
//     else {
//         console.log('Senha incorreta')
//     }
// })


// Sem escrever manualmente

// const bcrypt = require('bcrypt')
// const { senha } = require('./dia5_desafio_usuario')

// let usuario = {
//     nome: 'jose',
//     senha: ''
// }

// let senhaOriginal = '1234'

// bcrypt.hash(senhaOriginal, 10, function(err, hash) {
//     if (err) {
//         console.log('Erro ao gerar hash:', err)
//     }
//     usuario.senha = hash

//     console.log('Senha criptografida:', usuario.senha)

//     // Simula login
//     let senhaDigitada = '1234'
//     bcrypt.compare(senhaDigitada, usuario.senha, function(err, result) {
//         if (result) {
//             console.log('Login realizado com sucesso!')
//         }
//         else {
//             console.log('Senha incorreta!')
//         }
//     })
// })


// DESAFIO PRÁTICO DO DIA 6


// Simule o cadastro:

// nome do usuário (ex: “admin”)

// senha digitada

// valide os dados

// gere o hash com bcrypt

// Simule o login:

// senha digitada

// compare com o hash salvo

// imprima “Login realizado” ou “Senha incorreta”

const user = require('./dia6_userSalvo')

const bcrypt = require('bcrypt')

let senhaOriginal = '1234'

bcrypt.hash (senhaOriginal, 10, function(err, hash) {
    if (err) {
        console.log('Erro ao gerar hash!')
    }
    user.senha = hash

    let senhaDigitada = '1234'
    bcrypt.compare(senhaDigitada, user.senha, function(err, result) {
        if (result) {
            console.log(`Login realizado para o usuário: ${user.nome}`)
        }
        else {
            console.log('Senha incorreta!')
        }
    })
})