import express from 'express'
import { cadastrarLivro, livrosCadastrados, consulta, atualizarInformacao, deletarLivro, ordenarConsulta} from "./livros-controller.js";

const app = express()

const port = 3000

app.use(express.json())
app.get('/livros', async (req, res) => {
    let listaLivros = await livrosCadastrados()
    const {id, titulo, autor, ano, genero, quantidade_estoque, disponivel, ordenar} = req.query
    if (id) {
        id = parseInt(id)
        listaLivros = listaLivros.filter(l => l.id === id)
    }
    if (titulo) {
        listaLivros = listaLivros.filter(l => l.titulo.toLowerCase() === titulo.toLowerCase())
    }

    if (autor) {
        listaLivros = listaLivros.filter(l => l.autor.toLowerCase() === autor.toLowerCase())
    }

    if (ano) {
        listaLivros = listaLivros.filter(l => parseInt(l.ano) === parseInt(ano))
    }
    if (genero) {
        listaLivros = listaLivros.filter(l => l.genero.toLowerCase() === genero.toLowerCase())
    }
    if (quantidade_estoque){  
        listaLivros = listaLivros.filter(l => parseInt(l.quantidade_estoque) === parseInt(quantidade_estoque))
    }
    if (disponivel) {
        listaLivros = listaLivros.filter(l => l.disponivel.toLowerCase() === disponivel.toLowerCase())
    }
    console.log(ordenar)
    if (ordenar) {
        const ordem = await ordenarConsulta(ordenar)
        return res.send(ordem)
    }

    
    if (listaLivros.length === 0) {
        return res.status(404).send('Livro não encontrado')
    }
    return res.json(listaLivros)
})


app.get('/livros/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const verificacaoConsultaa = await consulta(id)
    if (verificacaoConsultaa.length === 0) {
        return res.status(404).send(`Livro com o ID "${id}" não encontrado!`)
    }
    return res.json(verificacaoConsultaa)

})

app.post('/livros', async (req, res) => {
    const {titulo, autor, ano, genero, quantidade_estoque} = req.body

    if (!titulo || titulo.trim() === '') {
        return res.status(400).send('Erro, campo "título" não pode ser vazio!')
    }

    if (!autor || autor.trim() === '') {
        return res.status(400).send('Erro, campo "autor" não pode ser vazio!')
    }

    if (!ano) {
        return res.status(400).send('Erro, campo "ano" não pode ser vazio!')
    }

    if (!genero || genero.trim() === '') {
        return res.status(400).send('Erro, campo "genero" não pode ser vazio!')
    }

    if (quantidade_estoque === undefined || quantidade_estoque < 0) {
        return res.status(400).send('Campo "quantidade_estoque" está com erro!')
    }
    
    await cadastrarLivro(titulo, autor, ano, genero, quantidade_estoque)
    return res.status(201).send(`Livro "${titulo}" cadastrado com sucesso!`)

})

app.put('/livros/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const {titulo, autor, ano, genero, quantidade_estoque, disponivel} = req.body
    let campo = []
    let informacoes = []
    if (!titulo || titulo.trim() === '') {
    }
    else {
        informacoes.push(titulo)
        campo.push("titulo")
    }
    if (!autor || autor.trim() === '') {
    }
    else {
        informacoes.push(autor)
        campo.push("autor")
    }

    if (!ano) {
    }
    else {
        informacoes.push(ano)
        campo.push("ano")
    }
    if (!genero || genero.trim() === '') {
    }
    else {
        informacoes.push(genero)
        campo.push("genero")
    }

    if (quantidade_estoque >= 0) {
        informacoes.push(quantidade_estoque)
        campo.push("quantidade_estoque")
    }
    else {
    }
    const verificacaoConsultaa = await consulta(id)
    if (verificacaoConsultaa.length === 0){
        return res.status(404).send(`Livro com o ID "${id}" não encontrado!`)
    }
    const atualizacao = await atualizarInformacao(informacoes, id, campo)
    if (!atualizacao) {
        return res.status(404).send('Erro ao mudar informações!')
    }
    return res.send(`Atualização feita nas informações do livro com ID "${id}"`)
})



app.delete('/livros/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    let livros = await livrosCadastrados()
    const existeID = livros.find(l => l.id === id)
    if (!existeID) {
        return res.status(400).send(`Livro com o ID "${id}" não encontrado!`)
    }
    let nomeLivro = existeID.titulo
    const excluirLivro = await deletarLivro(id)
    return res.send(`Livro "${nomeLivro}" excluido com sucesso!`)
})

app.listen(port, async () => {
    console.log('Servidor rodando na porta -> ', port)

})
