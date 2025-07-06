import express from 'express'
import { livrosCadastrados } from "./livros-controller.js";

const app = express()

const port = 3000

app.get('/livros', async (req, res) => {
    let listaLivros = livrosCadastrados()
    const {titulo, autor, ano, genero} = req.query
    titulo = titulo.toString()
    autor = autor.toString()
    ano = parseInt(ano)
    genero = genero.toString()
    if (titulo) {
        listaLivros = listaLivros.filter(titulo => l.titulo === titulo)
    }

    if (autor) {
        listaLivros = listaLivros.filter(autor => l.listaLivros === autor)
    }

    if (ano) {
        listaLivros = listaLivros.filter(ano => l.listaLivros === ano)
    }

    if (genero) {
        listaLivros = listaLivros.filter(genero => l.listaLivros === genero)
    }

    res.json(listaLivros)
})

app.listen(port, async () => {
    console.log('Servidor rodando na porta -> ', port)

})

//GET /livros: lista todos os livros ou filtra por título, autor, ano ou gênero (usando query params).
