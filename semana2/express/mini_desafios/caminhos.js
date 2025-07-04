const express = require('express')
const fs = require('fs/promises')

const app = express()
const port = 3000


app.use(express.json())
app.get('/produtos', (req, res) => {
    const precoMinimo = parseFloat(req.query.precoMaior)

    let lista = produtos

    if (!isNaN(precoMinimo)) {
        lista = produtos.filter(p => p.preco > precoMinimo)
    }

    res.json(lista)

    console.log()
    for (let i = 0; i < lista.length; i++) {
        let produto = lista[i]
        console.log('ID: ', produto.id)
        console.log('Nome Produto: ', produto.nome)
        console.log('Preço: ', produto.preco)
        console.log('Quantidade: ', produto.quantidade)
        console.log()
    }
})

app.get('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const id_verificacao = produtos.find(p => p.id === id)
    if (id_verificacao) {
        return res.json(id_verificacao)
    }
    
    res.status(404).send(`Produto com o ID "${id}" não encontrado!`)


})



app.post('/produtos', async (req, res) => {
    const {id, nome, preco, quantidade} = req.body

    if (typeof id !== 'number' || !nome || preco < 0|| quantidade < 0) {
        return res.status(400).send('Dados inválidos!')
    }
    const idVerificacao = produtos.find(p => p.id === id)

    if (idVerificacao) {
        return res.status(400).send(`Produto com o ID "${id}" já existe`)
    }
    produtos.push({id, nome, preco, quantidade})
    await fs.writeFile('desafio01.json', JSON.stringify(produtos, null, 2))
    res.send(`Produto "${nome}" adicionado com sucesso!`)
})


app.delete('/produtos', async(req, res) => {
    if (produtos.length == 0) {
        return res.status(400).send('Nenhum produto cadastrado')
    }
    produtos.length = 0
    await fs.writeFile('desafio01.json', JSON.stringify(produtos, null, 2))
    res.send('Produtos excluidos!')
})
app.listen(port, async () => {
    await carregarProdutos()
    console.log(`Servidor rodando na porta "${port}"`)

})