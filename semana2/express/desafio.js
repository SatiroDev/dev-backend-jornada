const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Olá, mundo!")
})

app.post('/mensagem', (req, res) => {
    console.log(req.body)
    const texto = req.body.texto
    res.send(`Você enviou: ${texto}`)
})

app.listen(port, () => console.log('Servidor rodando na porta ',port))