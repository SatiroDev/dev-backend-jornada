//  1. VARIÁVEIS

// let: valor pode mudar

// const: valor fixo

// var: evitar! (é antigo)

// ex:
let nome = "José"
// const idade = 17


// 2. TIPOS DE DADOS EM JS

// string → "Água"

// number → 3, 4.5

// boolean → true, false

// null → valor vazio

// undefined → ainda não definido

// object e array → veremos em dias futuros

//ex:
let produto = "água mineral"
let preco = 5.50
let estoque = true

// 3. OPERADORES

// Aritméticos: +, -, *, /, %

// Comparação: ==, ===, !=, >, <, >=, <=

// Lógicos: &&, ||, !

//ex:
let idade = 17
console.log(idade >= 18) // false


// Desafio prático do Dia 1:

// Crie um script dia1.js que faça o seguinte:

// Um vendedor de água quer registrar:

// Nome do cliente

// Idade

// Se pode comprar (idade ≥ 18)

// Quantas garrafas quer comprar

// Valor total da compra (cada garrafa = R$5,00)

let nomeCliente = "José Satiro"
let idadeCliente = 17
let quantidadeGarrafas = 3
let valorTotal = quantidadeGarrafas * 5
console.log(`Cliente: ${nomeCliente}`)
console.log(`Idade: ${idadeCliente}`)
console.log(`Pode comprar? ${idadeCliente>=18}` ) 
console.log(`Total a pagar por ${quantidadeGarrafas} garrafas: R$${valorTotal}`)
