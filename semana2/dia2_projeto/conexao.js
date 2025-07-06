import mysql from 'mysql2/promise';

export const conexao = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1624',
  database: 'sistema_livros'
});