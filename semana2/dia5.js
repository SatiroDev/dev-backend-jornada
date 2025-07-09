// Middleware de Autenticação e Autorização
// auth-middleware.js

import jwt from 'jsonwebtoken'

const secret_key = 'chaveSuperSecreta'

export const validarToken = (res, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1] // verifica se authHeader não é null nem undefined antes de tentar fazer o .split

    if (!token) return res.status(401).send('Token inválido ou mal formatado!')
    
    jwt.verify(token, secret_key, (err, user) => {
        if (err) return res.status(403).send('Token inválido ou expirado')

        req.user = user  // Agora qualquer rota acessa req.user.nome, req.user.id...
        next()
    })

}

//  Organização de Rotas (Modularização)
// 📁 Estrutura:

// 📁 projeto/
// ├── index.js
// ├── conexao.js
// ├── 📁 routes/
// │    └── usuarios.js
// ├── 📁 controllers/
// │    └── usuarios-controller.js

// Exemplo no usuarios.js:

// routes/usuarios.js

import express from 'express'
import { validarToken } from '../auth-middleware.js'
import { listarUsuarios } from '../controllers/usuarios-controller.js'

const router = express.Router()
// O router é como uma miniatura do app, usado para organizar as rotas em arquivos separados.
router.get('/', validarToken, async (req, res) => {
    const usuarios = await listarUsuarios()
    res.json(usuarios)
})


// No index.js

import express from 'express'
import rotaUsuarios from '.routes/usuarios.js'
//     ^^^^^^^^^^^^ -> pode ser qualquer nome, desde que você esteja usando **export default** no outro arquivo.

const app = express()

app.use(express.json())
app.use('/usuarios', rotaUsuarios)


// Refresh Token
// Para que serve?
// --> Manter o usuário logado por mais tempo sem pedir login de novo


// Validação com Joi

//  Para que serve?
// Evita que dados inválidos entrem na API

import Joi from 'joi'

const schemaUsuario = Joi.object({
    nome: Joi.string().min(3).required(),
    senha: Joi.string().min(4).required()
})

const { error } = schemaUsuario.validate(req.body)
if (error) {
    return res.status(400).send('Erro: ' + error.details[0].message)
}


// Níveis de Acesso (Admin x Usuário)
// Para que serve?
// Restringe ações.


// ex:

// Na hora de gerar o token de um admin:
const token = jwt.sign({id: usuario.id, nome: usuario.nome, tipo: 'admin'}, secret_key)


// Middleware só para admin:
const apenasAdmin = (req, res, next) => {
    if (req.user.tipo !== 'admin') {
        return res.status(403).send('Acesso restrito paraa administradores')
    }
    next()
}


app.delete('/usuarios/:id', validarToken, apenasAdmin, async (req, res) => {
    // Só admins passam
})