const express = require('express')
const fs = require('fs/promises')

const app = express()
const port = 3000

app.use(express.json())

let produtos = []

async function carregarProdutos() {
    try {
        const conteudo = await fs.readFile('produtos.json', 'utf-8')
        produtos = JSON.parse(conteudo)
    }
    catch (erro) {
        await fs.writeFile('produtos.json', '[]')
        produtos = []
    }
}

app.get('/produtos', (req, res) => {
    res.json(produtos)
    console.log('Produtos cadastrados: ')
    console.log()
    for (let i = 0; i < produtos.length; i ++ ) {
        let produto = produtos[i]
        console.log(`ID: ${produto.id} |Produto: ${produto.nome}  | Preço: R$${produto.preco} | Quantidade: ${produto.quantidade}`)
    }
})

app.post('/produtos', async(req, res) => {
    const id = req.body.id
    const nome = req.body.nome
    const preco = req.body.preco
    const quantidade = req.body.quantidade

    const existe = produtos.find(p => p.id === id)
    if (existe) {
        return res.status(400).send(`Produto com ID "${id}" já existe!`)
    }

    produtos.push({id, nome, preco, quantidade})

    await fs.writeFile('produtos.json', JSON.stringify(produtos, null, 2))
    console.log(`Produto cadastrado "${nome}".`)
    res.send(`Produto "${nome}" cadastrado com sucesso!`)
})

app.put('/produtos/:id', async(req, res) => {
    const id = parseInt(req.params.id)
    const { nome, preco, quantidade } = req.body

    const produto = produtos.find(p => p.id === id)
    const antigo_nome = produto.nome
    if (!produto) {
        return res.status(404).send(`Produto com ID "${id}" não encontrado!`)
    }
    if (nome !== undefined) produto.nome = nome
    if (preco !== undefined) produto.preco = preco
    if (quantidade !== undefined) produto.quantidade = quantidade

    await fs.writeFile('produtos.json', JSON.stringify(produtos, null, 2))
    res.send(`Produto "${antigo_nome}" atualizado com sucesso para -> "${produto.nome}"!`)
})


app.delete('/produtos/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    const indice = produtos.findIndex(p => p.id === id)

    if (indice === -1) {
        return res.status(404).send(`Produto com o ID "${id}" não encontrado!`)
    }

    const produtoRemovido = produtos.splice(indice, 1)[0]

    await fs.writeFile('produtos.json', JSON.stringify(produtos, null, 2))
    res.send(`Produto "${produtoRemovido.nome}" removido com sucesso!`)
})

app.listen(port, async () => {
    await carregarProdutos()
    console.log('Servidor rodando na porta', port)
})

// ✅ Mostra todos os produtos cadastrados (GET /produtos)

// ➕ Cadastra um novo produto (POST /produtos)

// 💾 Salva tudo num arquivo produtos.json

// 📦 Cada produto deve ter:
// nome

// preco

// quantidade