# Desafio  - Cadastro de Livros 📚

Neste desafio, foi construído um sistema completo de gerenciamento de livros usando **Node.js**, **Express** e **MySQL**.

---

## 🧠 Objetivo

Criar uma API REST que permita cadastrar, listar, filtrar, atualizar e deletar livros armazenados em um banco de dados MySQL.

---

## 🧱 Funcionalidades

- **GET /livros**  
  Lista todos os livros. Pode ser filtrado por:
  - `id`, `titulo`, `autor`, `ano`, `genero`, `quantidade_estoque`, `disponivel`
  - Também aceita ordenação com `?ordenar=campo`

- **GET /livros/:id**  
  Retorna um livro específico pelo ID.

- **POST /livros**  
  Cadastra um novo livro.  
  Campos obrigatórios:
  - `titulo`, `autor`, `ano`, `genero`, `quantidade_estoque`

- **PUT /livros/:id**  
  Atualiza os dados de um livro. Todos os campos são opcionais, mas devem ser válidos.

- **DELETE /livros/:id**  
  Deleta um livro pelo ID.

---

## 🛑 Regras de Validação

- Nenhum campo de texto pode ser vazio ou ausente.
- O campo `quantidade_estoque` deve ser maior ou igual a 0.
- O campo `disponivel` é calculado automaticamente:
  - `true` se quantidade > 0
  - `false` se quantidade = 0

---

## 💾 Banco de Dados

Nome do banco: `sistema_livros`  
Tabela `livros` criada automaticamente ao rodar o projeto.

```sql
create table if not exists livros (
  id int primary key auto_increment,
  titulo varchar(150) not null,
  autor varchar(150) not null,
  ano int not null,
  genero varchar(80) not null,
  quantidade_estoque int not null,
  disponivel varchar(20)
)
```
## ▶️ Como executar o projeto

1. **Clone o repositório** ou copie os arquivos localmente:
   ```bash
   git clone <link-do-repo>
   ```

2. **Instale as dependências:**
   ```bash
   npm install express mysql2
   ```

3. **Certifique-se de ter o MySQL rodando localmente**, com:

   - Banco de dados criado: `sistema_livros`
   - Usuário e senha configurados corretamente no arquivo `conexao.js`

4. **Execute o servidor:**
   ```bash
   node index.js
   ```

5. **A API ficará disponível em:**
   ```
   http://localhost:3000/livros
   ```

6. **Testes recomendados no Postman:**

   - `GET /livros` → lista todos os livros  
   - `GET /livros?id=1` → busca por ID  
   - `GET /livros?genero=ficcao` → filtra por gênero  
   - `POST /livros` → adiciona um livro (com JSON no corpo da requisição)  
   - `PUT /livros/2` → atualiza dados de um livro  
   - `DELETE /livros/3` → remove um livro  


---

## 📚 Aprendizado



Este desafio foi desenvolvido como parte do **Dia 1 ao Dia 3 (semana 2)**  da minha jornada em Node.js. Neste desafio, construí uma API completa com funcionalidades de cadastro, leitura, atualização e exclusão de livros (CRUD), praticando os seguintes conceitos:

- Integração com banco de dados MySQL
- Criação e manipulação de tabelas usando `mysql2/promise`
- Estruturação de rotas com Express
- Filtros dinâmicos via query parameters
- Atualização condicional de campos e estados automáticos
- Boas práticas de validação de dados na requisição

---

## 🙋‍♂️ Autor

**José Satiro**  
Estudante do IFCE (campus Maranguape)  
GitHub: [SatiroDev](https://github.com/SatiroDev)

---

Este desafio faz parte da minha trajetória de estudos no back-end com Node.js durante as férias. 🚀


