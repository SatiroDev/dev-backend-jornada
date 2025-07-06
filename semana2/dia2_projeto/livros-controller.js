import { conexao } from './conexao.js';

export const livrosCadastrados = async () => {
    const [criarTabela] = await conexao.execute(
        ` create table if not exists livros (
            id int primary key auto_increment,
            titulo varchar(150) not null,
            autor varchar(150) not null,
            ano date not null,
            genero varchar(80) not null,
            quantidade_estoque int not null
        )`
    )
    const [tabela] = await conexao.execute(
        'select * from livros'
    )
    return tabela
}

console.log(await livrosCadastrados())