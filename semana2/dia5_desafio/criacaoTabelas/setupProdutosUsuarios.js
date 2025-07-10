import { conexao } from '../conexao.js'

export const setupBancoUsuarios = async () => {
    await conexao.execute(`
        create table if not exists usuarios(
            id int primary key auto_increment,
            nome varchar(200) not null,
            senha varchar(255) not null,
            tipo varchar(100) default "usuarios"
        )`)
}


export const setupBancoProdutos = async () => {
    await conexao.execute(`
        create table if not exists produtos (
            id int primary key auto_increment,
            nome varchar(150) not null,
            preco decimal(10,2) not null,
            categoria varchar(100),
            quantidade_estoque int not null,
            disponivel varchar(5)
        )`)
}