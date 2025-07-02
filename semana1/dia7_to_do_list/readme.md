# 📝 To-Do List (CLI)

Projeto criado durante minha jornada de aprendizado em **Node.js**, focado em manipulação de arquivos JSON, listas e objetos.

## 📌 Funcionalidades

- Adicionar tarefas com título e descrição
- Listar tarefas pendentes
- Marcar tarefas como concluídas
- Excluir tarefas
- Persistência das tarefas em um arquivo `.json`
- Interface de linha de comando (CLI) com prompt

## 💡 Tecnologias utilizadas

- Node.js
- prompt-sync
- fs/promises (módulo nativo do Node.js)
- JSON para armazenamento de dados

## 🚀 Como executar

1. Instale as dependências (se necessário):

   ```bash
   npm install prompt-sync
   ```

2. Execute com Node.js:

   ```bash
   node to_do.js
   ```

3. O arquivo `tarefas.json` será criado e atualizado automaticamente.

## 📁 Estrutura

```
dia7_to_do_list/
├── to_do.js
└── tarefas.json
```
