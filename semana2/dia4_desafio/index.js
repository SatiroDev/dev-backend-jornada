import express from "express"
import jwt from "jsonwebtoken"
import bodyParser from "body-parser"
import { usuarios, cadastrarUser } from "./usuarios-controller.js"
import bcrypt from 'bcrypt'

const app = express()
app.use(bodyParser.json())
const port = 3000
const secret_key = 'da8S*%#%@dwsdaw#%'


app.post('/criar_user', async (req, res) => {
    const {nome, senha} = req.body

    if (!nome || nome.trim()==='') {
        return res.status(401).send('Nome de usuário não pode está vazio!')
    }
    if (!senha || nome.trim()===''){
        return res.status(401).send('Senha não pode ser vazia')
    }

    const adicionarUser = cadastrarUser(nome, senha)
    res.send(`Usuário "${nome}" adicionado com sucesso!`)
})
app.post('/login', async (req, res) => {
    const {nome, senha} = req.body
    const usuarios = await usuarios()
    const usuario = usuarios.find(u => u.nome === nome && u.senha === senha)
    if (!usuario) {
        return res.status(401).send('Usuário ou senha inválidos!')
    }
    const token = jwt.sign({id: usuario.id, nome: usuario.senha}, secret_key, {expiresIn: '1h'})
    res.json({token})
})

app.listen(port, async () => {
    console.log(`Servidor rodando na porta ${port}`)
})
// 📥 Rotas:
// POST /login

// Recebe nome e senha no body

// Verifica se o usuário existe no banco

// Se estiver correto, gera e retorna um JWT

// GET /perfil

// Rota protegida por middleware

// Requer token no header Authorization

// Retorna o nome e o id do usuário autenticado

// (Bônus) POST /cadastro

// Permite criar novos usuários (salva no banco)

// A senha deve ser criptografada com bcrypt

// 🧪 Dicas:
// Use jsonwebtoken, mysql2 e bcrypt

// Teste com Postman (Authorization → Bearer Token)

// Use express.json() e organize bem os arquivos (ex: conexao.js, auth-controller.js, etc.)

