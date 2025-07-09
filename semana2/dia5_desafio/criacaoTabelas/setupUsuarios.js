import mysql from 'mysql2/promise'
import { conexao } from '../conexao.js'

export const setupBancoUsuarios = async () => {
    await conexao.execute(`
        create table if not exists usuarios(
            id primary key auto_increment,
            nome varchar(200) not null,
            senha varchar(255) not null
        )`)
}