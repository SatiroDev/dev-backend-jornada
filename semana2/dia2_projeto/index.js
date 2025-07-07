import express from 'express'
import { cadastrarLivro, livrosCadastrados, consulta, atualizarInformacao, deletarLivro} from "./livros-controller.js";

const app = express()

const port = 3000

app.use(express.json())
app.get('/livros', async (req, res) => {
    let listaLivros = await livrosCadastrados()
    let {id, titulo, autor, ano, genero} = req.query
    if (id) {
        id = parseInt(id)
        listaLivros = listaLivros.filter(l => l.id === id)
    }
    if (titulo) {
        listaLivros = listaLivros.filter(l => l.titulo === titulo)
    }

    if (autor) {
        listaLivros = listaLivros.filter(l => l.autor === autor)
    }

    if (ano) {
        ano = parseInt(ano)
        listaLivros = listaLivros.filter(l => l.ano === ano)
    }

    if (genero) {
        listaLivros = listaLivros.filter(l => l.genero === genero)
    }
    if (listaLivros.length>=1) {
        res.json(listaLivros)
    }
    res.status(404).send('Livro não encontrado')
})


app.get('/livros/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const verificacaoConsultaa = await consulta(id)
    console.log(verificacaoConsultaa)
    if (verificacaoConsultaa.length === 0) {
        res.status(404).send(`Livro com o ID "${id}" não encontrado!`)
    }
    res.json(verificacaoConsultaa)

})

app.post('/livros', async (req, res) => {
    const {titulo, autor, ano, genero, quantidade_estoque, disponivel} = req.body

    if (!titulo || titulo.trim() === '') {
        res.status(400).send('Erro, campo "título" não pode ser vazio!')
    }

    if (!autor || autor.trim() === '') {
        res.status(400).send('Erro, campo "autor" não pode ser vazio!')
    }

    if (!ano) {
        res.status(400).send('Erro, campo "ano" não pode ser vazio!')
    }

    if (!genero || genero.trim() === '') {
        res.status(400).send('Erro, campo "genero" não pode ser vazio!')
    }

    if (!quantidade_estoque && quantidade_estoque < -1) {
        res.status(400).send('Campo "quantidade_estoque" está com erro!')
    }
    
    await cadastrarLivro(titulo, autor, ano, genero, quantidade_estoque)
    res.status(201).send(`Livro "${titulo}" cadastrado com sucesso!`)

})

app.put('/livros/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const titulo = req.body.titulo
    const autor = req.body.autor
    const ano = req.body.ano
    const genero = req.body.genero
    const quantidade_estoque = req.body.quantidade_estoque
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

    if (!quantidade_estoque || quantidade_estoque < 0) {
    }
    else {
        informacoes.push(quantidade_estoque)
        campo.push("quantidade_estoque")
    }
    const verificacaoConsultaa = await consulta(id)
    if (verificacaoConsultaa.length === 0){
        res.status(404).send(`Livro com o ID "${id}" não encontrado!`)
    }
    const atualizacao = await atualizarInformacao(informacoes, id, campo)
    console.log(atualizacao)
    if (!atualizacao) {
        res.status(404).send('Erro ao mudar informações!')
    }
    res.send(`Atualização feita nas informações do livro com ID "${id}"`)
})



app.delete('/livros/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    let livros = await livrosCadastrados()
    const existeID = livros.find(l => l.id === id)
    if (!existeID) {
        res.status(400).send(`Livro com o ID "${id}" não encontrado!`)
    }
    let nomeLivro = existeID.titulo
    const excluirLivro = await deletarLivro(id)
    res.send(`Livro "${nomeLivro}" excluido com sucesso!`)
})

app.listen(port, async () => {
    console.log('Servidor rodando na porta -> ', port)

})
