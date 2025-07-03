const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Olá, mundo! Esta é minha primeira API com Express.')
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})

