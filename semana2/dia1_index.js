const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => { // mesma coisa de -> fuction (req, res) {}
    res.send('Olá, mundo! Esta é minha primeira API com Express.')
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})

// HTTP GET: método para "pegar" dados de um servidor

// '/': rota raiz da aplicação

// req: objeto da requisição, com dados do cliente

// res: objeto para enviar a resposta ao cliente

// (req, res) => {}: função que será executada quando a rota for acessada

// res.send(): envia resposta para o cliente (pode ser texto, html, json...)


app.use(express.json()); // para entender JSON no corpo da requisição

app.post('/recursos', (req, res) => { /* criar recurso */ });
app.put('/recursos/:id', (req, res) => { /* atualizar recurso inteiro */ });
app.patch('/recursos/:id', (req, res) => { /* atualizar parcialmente */ });
app.delete('/recursos/:id', (req, res) => { /* deletar recurso */ });

app.listen(3000);