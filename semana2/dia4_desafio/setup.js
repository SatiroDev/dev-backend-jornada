import { conexao } from "./conexao.js";


export const setupBanco = async () => {
    await conexao.execute(
        `create table if not exists usuarios (
            id int primary key auto_increment,
            nome varchar(200) not null,
            senha varchar(255) not null
        )`
    )
}