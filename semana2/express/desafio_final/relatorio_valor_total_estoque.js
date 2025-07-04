const express = require('express')
const { writeFile } = require('fs')
const fs = require('fs/promises')

const app = express()
const port = 3000

app.use(express.json())

let produtos = []

async function carregarProdutos() {
    try {
        const conteudo = await fs.readFile('todos_produtos.json', 'utf-8')
        produtos = JSON.parse(conteudo)
    }
    catch (erro) {
        await fs.writeFile('todos_produtos.json', '[]')
        produtos = []
    }
}

app.get('/relatorio', (req,res) => {
    res.json(produtos)
    console.log('Produtos cadastrados: ')
    console.log()
    let valorTotal = 0
    for (let i = 0; i < produtos.length; i ++ ) {
        let produto = produtos[i]
        console.log(`ID: ${produto.id}`)
        console.log(`Produto: ${produto.nome}`)
        console.log(`Preço: R$${produto.preco}`)
        console.log(`Quantidade: ${produto.quantidade}`)
        console.log()
        valorTotal = valorTotal + (produto.preco * produto.quantidade)
    }
    console.log(`Valor total em estoque R$${valorTotal.toFixed(2)}`)
})

app.post('/relatorio', async (req, res) => {
    const id = req.body.id
    const nome = req.body.nome
    const preco = req.body.preco
    const quantidade = req.body.quantidade

    const verificacaoID = produtos.find(p => p.id === id)
    if (verificacaoID) {
        return res.status(404).send(`Produto com o ID "${id}" já existe!`)
    }

    produtos.push({id, nome, preco, quantidade})

    await fs.writeFile('todos_produtos.json', JSON.stringify(produtos, null, 2))
    res.send(`Produto "${nome}" adicionado com sucesso!`)
})

app.put('/relatorio/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const {nome, preco, quantidade} = req.body

    const indice = produtos.findIndex(p => p.id === id)

    if (indice === -1) {
        return res.send(`Produto com o ID "${id}" não encontrado!`)
    }
    const nomeAntigo = produtos[indice].nome

    if (nome !== undefined) produtos[indice].nome = nome
    if (preco !== undefined) produtos[indice].preco = preco
    if (quantidade !== undefined) produtos[indice].quantidade = quantidade

    await fs.writeFile('todos_produtos.json', JSON.stringify(produtos, null, 2))

    res.send(`Nome do produto "${nomeAntigo}" atualizado para -> "${produtos[indice].nome}".`)
})

app.delete('/relatorio/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    const indice = produtos.findIndex(p => p.id === id)

    if (indice === -1) {
        return res.status(404).send(`Produto com o ID "${id}" não encontrado!`)
    }

    const produtoDeletado = produtos.splice(indice, 1)[0]

    await fs.writeFile('todos_produtos.json', JSON.stringify(produtos, null, 2))
    res.send(`Produto "${produtoDeletado.nome}" deletado com sucesso!`)
})

app.listen(port, async () => {
    await carregarProdutos()
    console.log(`Servidor rodando na porta ${port}`)
})
