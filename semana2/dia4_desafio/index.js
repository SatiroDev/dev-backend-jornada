import express from "express"
import jwt from "jsonwebtoken"
import bodyParser from "body-parser"
import { usuarios, cadastrarUser, senhaCompare } from "./usuarios-controller.js"
import { setupBanco } from "./setup.js"
const app = express()
app.use(bodyParser.json())
const port = 3000
const secret_key = 'da8S*%#%@dwsdaw#%'


app.post('/cadastro', async (req, res) => {
    const {nome, senha} = req.body

    if (!nome || nome.trim()==='') {
        return res.status(401).send('Nome de usuário não pode está vazio!')
    }
    if (!senha || senha.trim()===''){
        return res.status(401).send('Senha não pode ser vazia')
    }

    const adicionarUser = await cadastrarUser(nome.toString(), senha.toString())
    res.send(`Usuário "${nome}" adicionado com sucesso!`)
})
app.post('/login', async (req, res) => {
    const {nome, senha} = req.body
    const senhacompare = await senhaCompare(nome.toString(), senha.toString()) 
    if (!senhacompare) {
        return res.status(401).send('Usuário ou senha inválidos!')
    }
    const token = jwt.sign({id: senhacompare.id, nome: senhacompare.nome}, secret_key, {expiresIn: '1h'})
    res.json({token})
})

const validarToken = async(req, res, next) => {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
        return res.status(401).send('Token não fornecido')
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

app.get('/perfil', validarToken, async (req, res) => {
    res.send(`Nome de usuário: ${req.user.nome} | ID do usuário: ${req.user.id}`)
})
app.listen(port, async () => {
    await setupBanco()
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

