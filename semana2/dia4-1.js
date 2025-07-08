import express from "express"
import jwt from "jsonwebtoken"
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.json())
const port = 3000
const secret_key = 'dw2r3rwee2eddsa3%72##'

const usuarios = [
    {id: 1, nome: 'jose', senha: '1234'}
]

app.post('/login', async (req, res) => {
    const {nome, senha} = req.body
    const usuario = usuarios.find(u => u.nome === nome && u.senha === senha)

    if (!usuario) {
        return res.status(401).send('Nome de usuário ou senha inválidos!')
    }

    const token = jwt.sign({id: usuario.id, nome: usuario.nome}, secret_key, {expiresIn: '1h'})
    res.json({token})
})

// middleware

const validarToken = async(req, res, next) => {
    const authHeader = req.headers['authorization']
    console.log("authHeader: " + authHeader)
    if (!authHeader) {
        return res.status(401).send('Token não fornecido!')
    }

    const token = authHeader.split(' ')[1]
    console.log('token: '+ token)
    if (!token) {
        return res.status(401).send('Token ausente')
    }
    jwt.verify(token, secret_key, (err, user) => {
        if (err) {
            return res.status(403).send('Token inválido!')
        }

        req.user = user 
        next()
    })
}
//rota protegida /perfil

app.get('/perfil', validarToken, async (req, res) => {
    res.send(`Oi, ${req.user.nome}! Dados protegidos.`)
})
app.listen(port, async () => {
    console.log(`Servidor rodando na porta ${port}`)
})
// Desafio rápido para praticar JWT e secret_key
// Objetivo: Criar uma API simples com login e uma rota protegida usando JWT.

// Passos:

// Crie uma rota /login que recebe um nome e senha fixos (ex: user: "teste", senha: "1234").

// Se os dados estiverem corretos, gere um token JWT usando uma secret_key que você escolheu (faça uma chave longa e segura).

// Crie um middleware para validar esse token, verificando a assinatura usando a mesma secret_key.

// Crie uma rota protegida /perfil que só retorna dados se o token for válido.

// Teste no Postman:

// Primeiro faça login para pegar o token.

// Depois acesse /perfil passando o token no cabeçalho Authorization: Bearer <token>.