// Parte 1: O que é um OBJETO?

// let cliente = {
//     nome: 'Satiro',
//     idade: 17,
//     pagamento: 'pix',
//     garrafas: 3
// }

//  Acessar dados do objeto:

// console.log(cliente.nome)
// console.log(cliente.pagamento)


// Parte 2: ARRAY de OBJETOS

// let clientes = [
//     {nome: 'Satiro', pagamento: 'pix', garrafas: 3},
//     {nome: 'Lima', pagamento: 'dinheiro', garrafas: 5},
//     {nome: 'Maria', pagamento: 'cartão', garrafas: 2}
// ]

// No FOR

// for (let i = 0; i < clientes.length; i ++) {
//     let cliente = clientes[i]
//     console.log(`Nome: ${cliente.nome}`)
//     console.log(`Forma de pagamento: ${cliente.pagamento}`)
//     console.log(`Quantidade de garrafas que deseja: ${cliente.garrafas}`)
//     console.log()
// }

//  DESAFIO PRÁTICO DO DIA 4

// Crie um array de 5 objetos contendo:

// nome

// tipo de pagamento (pix, dinheiro, cartão)

// quantidade de garrafas

// Crie uma função calcularValorTotal(cliente) que:

// recebe 1 objeto cliente

// calcula o valor com base nas regras:

// R$5 por garrafa

// 10% de desconto (pix)

// 5% de acréscimo (cartão)

// dinheiro = preço normal

// No for, percorra todos os clientes:

// imprima o nome

// tipo de pagamento

// valor total formatado

function calcularValorTotal(cliente) {
    let valor_garrafa = 5
    let valor_a_pagar = 0
    switch (cliente.tipo_pagamento) {
        case 'pix':
            valor_a_pagar = (valor_garrafa * 0.9) * cliente.quantidade_garrafas
            break;
        case 'cartão':
            valor_a_pagar = (valor_garrafa * 1.05) * cliente.quantidade_garrafas
            break;
        case 'dinheiro':
            valor_a_pagar = valor_garrafa * cliente.quantidade_garrafas
            break;
        default:
            console.log(`Método de pagamento -> "${cliente.tipo_pagamento}" inválido!`)
            break;
    }
    return valor_a_pagar
}

let todos_clientes = [
    {nome: 'José', tipo_pagamento: 'pix', quantidade_garrafas: 2},
    {nome: 'Lima', tipo_pagamento: 'cartão', quantidade_garrafas: 2},
    {nome: 'João', tipo_pagamento: 'dinheiro', quantidade_garrafas: 0},
    {nome: 'Jorge', tipo_pagamento: 'pi', quantidade_garrafas: 5},
    {nome: 'Lúcia', tipo_pagamento: 'cartão', quantidade_garrafas: 1}
]

for (let i = 0; i < todos_clientes.length; i ++) {
    let cliente = todos_clientes[i]
    console.log(`Cliente: ${cliente.nome}`)
    console.log(`Pagamento: ${cliente.tipo_pagamento}`)
    let total_a_pagar = calcularValorTotal(cliente)
    console.log(`Total a pagar: R$${total_a_pagar.toFixed(2)}`)
    console.log()
}

