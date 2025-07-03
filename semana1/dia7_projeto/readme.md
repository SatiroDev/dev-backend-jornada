# 🧾 Projeto: Cadastro e Sistema de Vendas (com autenticação)

Este projeto simula um sistema simples de **cadastro de usuários com senha criptografada usando `bcrypt`**, além de **registrar vendas** e armazenar todos os dados em arquivos `.json`.

---

## ✅ Funcionalidades

- Criar uma conta com nome de usuário e senha  
- Login com validação da senha criptografada  
- Registro de vendas com tipo de pagamento e cálculo de valor  
- Criação automática dos arquivos `bd_usuarios.json` e `bd_vendas.json`  
- Relatório de vendas após cada operação  
- Persistência de dados em arquivos `.json`

---

## 🛠 Tecnologias utilizadas

- Node.js  
- prompt-sync  
- bcrypt  
- fs/promises

---

## 📁 Estrutura esperada

```
.
├── bd_usuarios.json
├── bd_vendas.json
├── cadastro_login_vendas.js
```

---

## 🚀 Como executar

1. Instale as dependências necessárias (copie e cole o comando abaixo no terminal):

```bash
npm install prompt-sync bcrypt
```

2. Crie um arquivo chamado `cadastro_login_vendas.js` e **cole dentro dele o código do projeto**.

3. Para rodar o sistema, use o seguinte comando no terminal (dentro da pasta onde está o arquivo):

```bash
node cadastro_login_vendas.js
```

> Obs: Certifique-se de que o Node.js está instalado corretamente no seu computador.


---

## 💡 Lógica principal

- O programa inicia verificando se os arquivos `.json` existem. Se não existirem, ele cria automaticamente.
- O usuário pode criar uma conta com nome e senha. A senha é protegida com `bcrypt`.
- Após login, o sistema solicita os dados da venda: nome do cliente, quantidade e tipo de pagamento.
- O valor total é calculado com base na forma de pagamento (`pix`, `cartão`, ou `dinheiro`).
- As vendas são armazenadas no arquivo `bd_vendas.json`.
- O programa exibe um relatório geral com todas as vendas registradas.

---

## 📌 Observações

- O código usa `fs/promises` para trabalhar de forma assíncrona com os arquivos.  
- O uso de `bcrypt.hash()` e `bcrypt.compare()` garante que as senhas não sejam armazenadas em texto puro.  
- A entrada de dados é feita com `prompt-sync`, que simula entrada via terminal.

---

## 📚 Aprendizado

Este projeto foi desenvolvido como parte do **Dia 5 ao Dia 7** da minha jornada em **Node.js** durante as férias. Aqui pude praticar:

- Manipulação de arquivos JSON  
- Funções assíncronas (`async/await`)  
- Segurança básica com senhas criptografadas  
- Validação de entrada de dados  
- Organização de lógica e controle de fluxo

---

## 🙋‍♂️ Autor

**José Satiro**  
Estudante do IFCE (campus Maranguape)  
[GitHub: SatiroDev](https://github.com/SatiroDev)

---

Projeto feito como parte da minha jornada de aprendizado em desenvolvimento back-end com Node.js.
