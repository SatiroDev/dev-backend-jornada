import express from "express"
import jwt from "jsonwetoken"
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

    const token = jwt.sign({id: usuario.id, nome: usuario.nome}, secret_key, {expiresIN: '1h'})
    res.json({token})
})


app.listen(port, async () => {
    console.log(`Servidor rodando na porta ${port}`)
})