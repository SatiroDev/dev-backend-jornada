import express from "express"
import jwt from "jsonwebtoken"
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.json())
const port = 3000
const secret_key ='segredoSuperSecreto'

const usuarios = [
  { id: 1, nome: 'joao', senha: '1234' },
  { id: 2, nome: 'maria', senha: 'abcd' },
];

// Rota de login - recebe nome e senha, retorna token JWT
app.post('/login', async (req, res) => {
    const {nome, senha} = req.body
    const usuario = usuarios.find(u => u.nome === nome && u.senha === senha)

    if (!usuario) {
        return res.status(401).send('Usuário ou senha inválidos!')
    }
    const token = jwt.sign({id: usuario.id, nome: usuario.nome}, secret_key, {expiresIn: '1h'})
    res.json({token})
})

// Middleware para proteger rotas

const validarToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        return res.status(401).send('Token não fornecido!')
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).send('Token ausente!')
    }

    jwt.verify(token, secret_key, (err, user) => {
        if (err) {
            return res.status(403).send('Token inválido!')
        }

        req.user = user
        next()
    })
}

// Rota protegida - só acessível com token válido

app.get('/dados-protegidos', validarToken, async (req, res) => {
    res.send(`Olá. ${req.user.nome}! Esses dados são protegidos,`)
})

app.listen(port, async () => {
    console.log(`Servidor rodando na porta ${port}`)
})