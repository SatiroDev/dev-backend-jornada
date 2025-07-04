# 📦 Projeto: Sistema de Relatório de Produtos com Node.js e Express

Este projeto é uma API RESTful feita com **Node.js** e **Express** que simula um sistema de controle de estoque. A aplicação permite **registrar, consultar, editar e remover produtos**, mantendo os dados salvos em um arquivo `.json`.

---

## ✅ Funcionalidades

- ➕ Cadastrar novos produtos  
- 📋 Listar todos os produtos com relatório detalhado no terminal  
- ✏️ Atualizar produtos por ID  
- ❌ Remover produtos por ID  
- 💾 Persistência dos dados no arquivo `todos_produtos.json`  
- 🧮 Cálculo do valor total do estoque  

---

## 🛠 Tecnologias utilizadas

- Node.js  
- Express  
- fs/promises  

---

## 📁 Estrutura esperada

```
.
├── todos_produtos.json
└── app.js
```

---

## 🚀 Como executar

1. Instale as dependências:

```bash
npm install express
```

2. Execute o servidor:

```bash
node app.js
```

3. Use uma ferramenta como o [Postman](https://www.postman.com/) ou o [Insomnia](https://insomnia.rest/) para interagir com os endpoints da API.

---

## 🔗 Rotas disponíveis

### `GET /relatorio`

- Retorna todos os produtos cadastrados em formato JSON.
- Imprime no terminal um relatório detalhado com:
  - ID
  - Nome
  - Preço
  - Quantidade
  - Valor total do estoque

---

### `POST /relatorio`

- Cadastra um novo produto.
- Corpo (JSON):

```json
{
  "id": 1,
  "nome": "Teclado",
  "preco": 99.90,
  "quantidade": 10
}
```

---

### `PUT /relatorio/:id`

- Atualiza os dados de um produto pelo ID.
- Corpo (JSON):

```json
{
  "nome": "Teclado Mecânico",
  "preco": 149.90,
  "quantidade": 5
}
```

---

### `DELETE /relatorio/:id`

- Remove um produto com base no ID.

---

## 📌 Observações

- O arquivo `todos_produtos.json` é criado automaticamente se não existir.  
- A verificação impede o cadastro de dois produtos com o mesmo `id`.  
- O cálculo do valor total em estoque é feito somando `preço × quantidade` de todos os produtos.  

---

## 🙋‍♂️ Autor

**José Satiro**  
Estudante do IFCE (Campus Maranguape)  
[GitHub: SatiroDev](https://github.com/SatiroDev)

---

Projeto desenvolvido como parte da **Semana 2 - API REST com Node.js** na minha jornada de aprendizado back-end 🚀
