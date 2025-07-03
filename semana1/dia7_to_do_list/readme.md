# ✅ Projeto: To-Do List com Persistência em JSON

Este projeto é uma aplicação simples de **gerenciamento de tarefas** feita em **Node.js**, com entrada de dados via terminal. As tarefas podem ser **adicionadas, listadas, marcadas como concluídas e excluídas**, e todas são armazenadas de forma persistente em um arquivo `.json`.

---

## ✅ Funcionalidades

- Adicionar tarefa com título e descrição  
- Listar todas as tarefas salvas  
- Marcar tarefa como concluída  
- Excluir tarefa pelo título  
- Armazenamento automático em `tarefas.json`  
- Criação automática do arquivo caso não exista  

---

## 🛠 Tecnologias utilizadas

- Node.js  
- prompt-sync  
- fs/promises  

---

## 📁 Estrutura esperada

```
.
├── tarefas.json
├── to_do_list.js
└── README.md
```

---

## 🚀 Como executar

1. Instale as dependências:

```bash
npm install prompt-sync
```

2. Execute o projeto com o Node.js:

```bash
node to_do_list.js
```

---

## 💡 Lógica principal

- O programa verifica se o arquivo `tarefas.json` existe. Caso não exista, ele cria automaticamente.
- O usuário pode adicionar tarefas com título e descrição.
- Todas as tarefas têm um **status** (inicialmente “Pendente”) que pode ser atualizado para “Completa”.
- Também é possível excluir tarefas informando o título.
- As informações são salvas no arquivo `tarefas.json` de forma persistente.

---

## 📌 Observações

- Toda entrada de dados é feita via terminal com `prompt-sync`.
- As operações de leitura e escrita usam `fs/promises` para garantir funcionamento assíncrono.
- O código usa `async/await` e validações simples para manter a integridade dos dados.

---

## 📚 Aprendizado

Este projeto foi desenvolvido como parte da **Semana 1** da minha jornada em **Node.js** nas férias. Nele, pude treinar:

- Manipulação de arquivos JSON  
- Criação de menus interativos no terminal  
- Uso de `fs/promises`  
- Estruturação de código assíncrono  
- Validação de entrada de dados  
- Organização e persistência de informações

---

## 🙋‍♂️ Autor

**José Satiro**  
Estudante do IFCE (campus Maranguape)  
[GitHub: SatiroDev](https://github.com/SatiroDev)

---

Projeto feito como parte da minha jornada de aprendizado em desenvolvimento back-end com Node.js.
