import express from 'express';

import fs from 'fs/promises';

const app = express()
const port = 3000


app.use(express.json())

let produtos = []


export const carregarProdutos = async () => {
    try {
        const conteudo = await fs.readFile('desafio01.json', 'utf-8')
        produtos = JSON.parse(conteudo)
    }
    catch (erro) {
        await fs.writeFile('desafio01.json', '[]')
        produtos = []
    }
}




// Criar uma rota que retorna um produto pelo ID (GET /produtos/:id)