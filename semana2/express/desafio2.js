const express = require('express')
const fs = require('fs/promises')

const app = express()
const port = 3000

app.use(express.json())

let usuarios = []

async function carregarUsuarios() {
    try {
        const conteudo = await fs.readFile('usuarios.json', 'utf-8')
        usuarios = JSON.parse(conteudo)
    } catch (erro) {
        // Se o arquivo não existir, cria com lista vazia
        await fs.writeFile('usuarios.json', '[]')
        usuarios = []
    }
}

app.get('/usuarios', (req, res) => {
    res.json(usuarios)
})

app.post('/usuarios', async (req, res) => {
    const nome = req.body.nome
    const idade = req.body.idade

    usuarios.push({ nome, idade })

    await fs.writeFile('usuarios.json', JSON.stringify(usuarios, null, 2))

    res.send(`Usuário "${nome}" cadastrado com sucesso!`)
})

app.listen(port, async () => {
    await carregarUsuarios()
    console.log('Servidor rodando na porta', port)
})
