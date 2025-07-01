// Parte 1: FUNÇÕES em JavaScript

// function saudacao (nome) {
//     return `Olá, ${nome}`
// }

// console.log(saudacao('Satiro'))

// function mostrarTotal(valor) {
//     console.log(`Total: R$${valor}`)
// }
// mostrarTotal(10)

// Parte 2: LAÇOS de repetição

// FOR
// for (let i = 1; i <= 5; i ++) {
//     console.log(`Vendendo garrafa ${i}`)
// }

// WHILE

// let i = 1
// while (i <= 5) {
//     console.log(`Vendendo garrafa ${i}`)
//     i ++
// }

// Parte 3: ARRAYS/LISTAS


// Criar ARRAYS
// let clientes = ['Ana', 'Lucas', 'Satiro', 'Bruno', 'Lívia']
// let pagamentos = ['dinheiro', 'pix', 'cartão', 'pix', 'dinheiro']

// Acessar itens
// console.log(clientes[0])
// console.log(pagamentos[2])

// Usar com for
// for (let i = 0; i < clientes.length; i ++){
//     console.log(`${clientes[i]} pagou com ${pagamentos[i]}`)
// }

// Adicionar no fim -> push

// clientes.push('João')
// console.log(clientes)

// Remover no fim -> pop

// clientes.pop()
// console.log(clientes)

// alguns métodos

// .length – quantidade de itens no array

// .includes("Lucas") – verifica se tem “Lucas”

// .indexOf("Satiro") – retorna o índice



// DESAFIO PRÁTICO DO DIA 3

// Cria uma função que calcula o valor total da compra com base em:

// quantidade de garrafas

// valor unitário

// tipo de pagamento (pix, dinheiro, cartão)

// Usa um laço for para simular a venda de 5 clientes.

// Para cada cliente:

// Mostre nome

// Tipo de pagamento

// Total formatado


let clientes = ['José', 'Satiro', 'Maria', 'João', 'Lima']
let tipo_pagamento = ['pix', 'dinheiro', 'cartão', 'cartão', 'pix']
let quantidade_garrafas = [2, 4, 3, 6, 1]
let preco_unitario = 5
function valorTotal(qnt_garrafas, preco, tp_pagamento) {
    let valor_final = 0
    switch (tp_pagamento) {
        case 'pix':
            valor_final = (preco * 0.9) * qnt_garrafas
            break;
        case 'cartão':
            valor_final = (preco * 1.05) * qnt_garrafas
            break;
        case 'dinheiro':
            valor_final = preco * qnt_garrafas
            break
        default:
            console.log('Forma de pagamento inválida!')
            break;
    }
    return valor_final
}


for (let i = 0; i < clientes.length; i ++) {
    console.log(`Nome do cliente: ${clientes[i]}`)
    console.log(`Tipo do pagamento: ${tipo_pagamento[i]}`)
    console.log(`Quantidade de garrafas que deseja comprar: ${quantidade_garrafas[i]}`)
    let valor_a_pagar = valorTotal(quantidade_garrafas[i], preco_unitario, tipo_pagamento[i])
    if (valor_a_pagar != 0) {
        console.log(`Valor que tem que pagar: R$${valor_a_pagar.toFixed(2)}`)
    }
    console.log()
}


