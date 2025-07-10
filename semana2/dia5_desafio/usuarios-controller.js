// 📁 Arquivos que você deve criar:
// conexao.js
// Conexão com o banco de dados MySQL. -> OK


import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { conexao } from './conexao.js'
import { validacaoNomeSenha } from './validacoes/usuarioSchema.js'
import { secret_key } from '../secret_key/secretKey.js'

export const listarUsuarios = async () => {
    const [selectTabelaUsuarios] = await conexao.execute(
        `select * from usuarios`
    )
    return selectTabelaUsuarios
}



export const cadastroDeUsuario = async (req, res, next) => {
    
    try {
        const {nome, senha, tipo} = req.body
        let senhaStr = senha.toString()
        
        let tipoCerto = 'usuario'
        if (tipo.trim()) {
            tipoCerto = tipo.toLowerCase()
        }
        const validarNomeSenha = await validacaoNomeSenha({nome, senhaStr})
        if (validarNomeSenha){
            const senhaHash = await bcrypt.hash(senha.toString(), 10)
            const [insert] = await conexao.execute(
                `insert into usuarios (nome, senha, tipo)
                values (?, ?, ?)`,
                [nome, senhaHash, tipoCerto]
            )
            console.log(`Usuário(a) "${nome}" cadastrado com sucesso!`)
            return res.send(`Usuário(a) "${nome}" cadastrado com sucesso!`)
        }
        return res.status(401).send('Nome ou senha inválidos! Ambos tem que ter no minímo 4 caracteres!')
    } catch (error) {
        console.log('Erro ao cadastrar usuario(a) ', error)
        return res.status(401).send('Erro ao cadastrar usuario(a)')
    }
} 

export const LoginDeUsuario = async (req, res, next) => {
    try {
        const {nome, senha, tipo} = req.body
        let senhaStr = senha.toString()
        const users = await listarUsuarios()
        for (const usuario of users) {
            if(usuario.nome === nome) {
                const passwordNoHash = await bcrypt.compare(senhaStr, usuario.senha)
                if (passwordNoHash) {
                    return res.json(await GerarToken(secret_key, nome, usuario.tipo))
                }
            }
        }
        return res.status(403).send('Usuário ou senha inválidos!')
    } catch (error) {
        console.log('Erro ao fazer login ', error)
        return res.status(401).send('Erro ao fazer login')
    }

}

export const GerarToken = async (chave, usuario, tipo) => {
    const token =  jwt.sign({id: usuario.id, nome: usuario.nome, tipo: tipo}, chave, {expiresIn: '1h'})
    return {token}
}


export const verificacaoId = async (id) => {
    const [consultaId] = await conexao.execute(
        `select * from usuarios
        where id = ?`,
        [id]
    )
    return consultaId
}

