

// 🚀 Desafio: API de Gerenciamento de Produtos com Login (Admin e Usuário)
// 🎯 Objetivo:
// Criar uma API em Node.js com Express + MySQL, que permita:

// Cadastro e login de usuários (com senha criptografada)

// Proteção de rotas usando JWT

// Rotas diferentes para usuários comuns e admins

// Validação de dados com Joi

// Refresh opcional se quiser ir além (desafio extra)

// 🔧 Funcionalidades obrigatórias
// 👥 Autenticação
// POST /cadastro: cadastra usuário (nome, senha, tipo)

// Campos:

// nome (string, mínimo 3 caracteres)

// senha (mínimo 4 caracteres)

// tipo: "admin" ou "usuario" (default = "usuario")

// POST /login: retorna um token JWT válido por 1 hora

// 🛒 Produtos
// (⚠️ Só podem ser manipulados com token válido)

// GET /produtos: lista todos os produtos

// POST /produtos: apenas admins podem cadastrar produto

// PUT /produtos/:id: apenas admins podem atualizar

// DELETE /produtos/:id: apenas admins podem excluir

// Produto deve conter:
// id (auto_increment)

// nome (string)

// preco (float)

// quantidade_estoque (int)

// disponivel: true/false (baseado na quantidade)

// 🧰 Extras para quem quiser ir além
// POST /token/refresh: envia o refresh token e retorna um novo access token

// GET /perfil: rota que retorna os dados do usuário autenticado (usando o token)

// 🗃️ Banco de Dados
// Crie dois arquivos:

// usuarios-controller.js

// produtos-controller.js

// Cada um deve lidar com suas tabelas respectivas no banco sistema_completo.

// 📦 Tecnologias sugeridas:
// express

// mysql2

// jsonwebtoken

// bcrypt

// joi

// (opcional) dotenv

// 📄 Readme sugerido depois que terminar:
// Descrição do projeto

// Como executar

// Exemplos de requisições

// Tecnologias utilizadas