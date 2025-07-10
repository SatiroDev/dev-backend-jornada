// index.js (ou server.js)


// index.js
// Arquivo principal.

// Inicia o servidor Express.

// Importa e usa as rotas.


import express, { json } from 'express'
import { setupBancoProdutos, setupBancoUsuarios } from './criacaoTabelas/setupProdutosUsuarios.js'
import LoginUsuario from './routes/loginUsuario.js'
import CadastroUsuario from './routes/cadastroUsuario.js'
import listProdutos from './routes/listarProdutos.js'
import cadastrarProduto from './routes/cadastroProduto.js'
import atualizaProduto from './routes/atualizarProduto.js'

const PORT = 3000 
const app = express()

app.use(express.json())

app.use('/login', LoginUsuario)

app.use('/cadastro', CadastroUsuario)

app.use('/produtos', listProdutos)

app.use('/produtos', cadastrarProduto)

app.use('produtos/:id', atualizaProduto)
app.listen(PORT, async () => {
    await setupBancoProdutos()
    await setupBancoUsuarios()
    console.log(`Servidor rodando na porta ${PORT}`)
})