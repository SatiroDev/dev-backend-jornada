# 🔐 API de Autenticação com JWT e MySQL

Este projeto é uma API simples de autenticação utilizando **Node.js**, **Express**, **JWT** e **bcrypt**, com persistência de dados em um banco **MySQL**.

---

## 📌 Funcionalidades

- Cadastro de novos usuários com senha criptografada  
- Login com geração de token JWT válido por 1 hora  
- Rota protegida acessível apenas com token válido  
- Validações básicas nos campos de entrada

---

## 💡 Tecnologias usadas

- Node.js  
- Express  
- JWT (`jsonwebtoken`)  
- Bcrypt  
- MySQL2  
- Body-parser (opcional, pode ser substituído por `express.json()` puro)

---

## 📁 Estrutura do projeto

```bash
.
├── conexao.js                # Conexão com o banco de dados MySQL
├── usuarios-controller.js    # Funções para cadastro e verificação de usuários
├── index.js                  # Arquivo principal com rotas e middleware
└── README.md
```

---

## ▶️ Como executar o projeto

1. **Clone o repositório ou copie os arquivos localmente:**
   ```bash
   git clone <link-do-seu-repo>
   ```

2. **Instale as dependências:**
   ```bash
   npm install express jsonwebtoken mysql2 bcrypt body-parser
   ```

3. **Configure o banco MySQL:**

   - Certifique-se de que o MySQL está em execução  
   - Crie o banco de dados: `usuarios_cadastrados`  
   - O arquivo `conexao.js` deve conter algo como:
     ```js
     user: 'root',
     password: 'sua_senha',
     database: 'usuarios_cadastrados'
     ```

4. **Inicie o servidor:**
   ```bash
   node index.js
   ```

5. **Acesse a API com o Postman ou Insomnia:**

   ### ✅ Cadastro
   ```http
   POST /cadastro
   ```
   **Body (JSON):**
   ```json
   {
     "nome": "jose",
     "senha": "1234"
   }
   ```

   ### 🔐 Login
   ```http
   POST /login
   ```
   **Body (JSON):**
   ```json
   {
     "nome": "jose",
     "senha": "1234"
   }
   ```
   **Retorna:**
   ```json
   {
     "token": "JWT_TOKEN_AQUI"
   }
   ```

   ### 🔒 Rota protegida
   ```http
   GET /perfil
   ```
   **Headers:**
   ```
   Authorization: Bearer JWT_TOKEN_AQUI
   ```

---

## 📚 Aprendizado

Este projeto foi desenvolvido como parte da **Semana 2 — Dia 4** da minha jornada em Node.js durante as férias. Nele pude praticar:

- Criação e verificação de tokens JWT  
- Criptografia de senhas com bcrypt  
- Middleware para proteger rotas  
- Integração completa com banco de dados MySQL

---

## 🙋‍♂️ Autor

**José Satiro**  
Estudante do IFCE - Campus Maranguape  
GitHub: [SatiroDev](https://github.com/SatiroDev)
