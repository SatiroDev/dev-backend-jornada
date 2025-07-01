// 1. CONDICIONAIS -> if, else if e else



// let idade = 18

// if (idade >= 18) {
//     console.log('Pode comprar água')
// }
// else {
//     console.log('Não pode comprar')
// }


// let nota = 7

// if (nota >= 9) {
//     console.log('Excelente')
// }
// else if (nota >= 6) {
//     console.log('Aprovado')
// }
// else {
//     console.log('Reprovado')
// }

// 2. OPERADORES EM CONDIÇÕES
// > (maior que)

// < (menor que)

// == (igual — ignora tipo)

// === (igual — leva tipo em conta) → melhor usar

// !=, !== (diferente)

// && (E), || (OU), ! (NÃO)


// let bebida = "água"

// switch (bebida) {
//     case "água":
//         console.log('R$5,00')
//         break;
//     case "suco":
//         console.log('R$7,00')
//         break;
//     default:
//         console.log('Produto não encontrado')
//         break;
// } 

// DESAFIO PRÁTICO DO DIA 2
// Crie um arquivo dia2.js que:

// Define a idade de um cliente

// Define o tipo de pagamento ("dinheiro", "cartão" ou "pix")

// Define a quantidade de garrafas

// Usa if/else para:

// Verificar se pode comprar (18+)

// Usa switch para:

// Aplicar desconto de 10% se for PIX

// Acréscimo de 5% se for cartão

// Sem alteração se for dinheiro

let idade = 18

let tipoPagamento = 'cartão'

let quantidadeGarrafas = 3

let valorGarrafa = 5

if (idade >= 18) {
    console.log('Cliente pode comprar? true')
}
else {
    console.log('Cliente pode comprar? false')
}

console.log(`Pagamento: ${tipoPagamento}`)
let valor_final = 0
switch (tipoPagamento) {
    case 'pix':
        valor_final = (valorGarrafa * 0.9) * quantidadeGarrafas
        break;
    case 'cartão':
        valor_final = (valorGarrafa * 1.05) * quantidadeGarrafas
        break;
    case 'dinheiro':
        valor_final = valorGarrafa * quantidadeGarrafas
        break
    default:
        console.log('Método de pagamento inválido!')
        break;
}
console.log(`Total com desconto/acréscimo: R$${valor_final.toFixed(2)}`)