import mysql from 'mysql2/promise'
import { conexao } from '../conexao.js'

export const setupBancoProdutos = async () => {
    await conexao.execute(`
        create table if not exists produtos (
            id int primary key auto_increment,
            nome varchar(150) not null,
            preco decimal(10,2) not null,
            categoria varchar(100),
            quantidade_estoque int not null,
            disponivel boolean
        )`)
}