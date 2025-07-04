const express = require('express')

const app = express()
const port = 3000

app.use(express.json())
app.get ('/', (req, res) => {
    res.send('Olá, mundo!')
})


app.post('/dados', (req, res) => {
    console.log('Requisição POST recebida')
    console.log(req.body) // Veja se o JSON chegou
    const nome = req.body.nome
    res.send(`Olá. ${nome}`)
})

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))