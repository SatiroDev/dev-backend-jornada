import { conexao } from "./conexao.js"
import bcrypt from 'bcrypt'


export const usuarios = async () => {
    const [tabela] = await conexao.execute(
        'select * from usuarios'
    )
    return tabela
} 

export const cadastrarUser = async (nome, senha) => {
    const senhaHash = await bcrypt.hash(senha, 10)

    const [insert] = await conexao.execute(
        `insert into usuarios (nome, senha)
        values (?, ?)`,
        [nome, senhaHash]
    )
    return insert
}

export const senhaCompare = async (nome, senha) => {
    const users = await usuarios()
    for (let i = 0; i < users.length; i++) {
        let usuario = users[i]
        if (usuario.nome === nome) {
            const verificacaoSenha = await bcrypt.compare(senha, usuario.senha)
            if (verificacaoSenha) {
                return usuario
            }
        }
    }
    return false
} 

