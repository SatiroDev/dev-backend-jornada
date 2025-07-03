const prompt = require('prompt-sync')()
const bcrypt = require('bcrypt')


async function main() {
    const fs = require('fs/promises')
    const fsSync = require('fs')

    async function iniciarArquivos() {
        if (!fsSync.existsSync('bd_usuarios.json')) {
            await fs.writeFile('bd_usuarios.json', '[]')
        }
        if (!fsSync.existsSync('bd_vendas.json')) {
            await fs.writeFile('bd_vendas.json', '[]')
        }
    }

    async function menu() {
        console.log(' --- MENU --- ')
        console.log('1. Criar uma conta')
        console.log('2. Fazer login')
        let opcao = prompt('Escolha uma opção: ')
        return opcao
    }

    async function criarConta() {
        let nomeUser = prompt('Digite um nome de usuário para criar: ')
        let senharUser = prompt('Digite uma senha: ')
        return [nomeUser, senharUser]
    }

    async function fazerLogin() {
        let nomeDigitado = prompt('Digite o nome de usuário para fazer login: ')
        let senhaDigitada = prompt('Digite a senha: ')
        return [nomeDigitado, senhaDigitada]
    }

    async function lerUsers() {
        await iniciarArquivos()
        let conteudo = await fs.readFile('bd_usuarios.json', 'utf-8')
        return JSON.parse(conteudo)
    }
    async function lerVendas() {
        await iniciarArquivos()
        let conteudo = await fs.readFile('bd_vendas.json', 'utf-8')
        return JSON.parse(conteudo)
    }

    async function salvarUsers(lista) {
        await iniciarArquivos()
        await fs.writeFile('bd_usuarios.json', JSON.stringify(lista, null, 2))
    }

    async function salvarVendas(lista) {
        await iniciarArquivos()
        await fs.writeFile('bd_vendas.json', JSON.stringify(lista, null, 2))
    }

    function validarCadastro(nome, senha) {
        if (!nome || nome.trim() === '') {
            console.log('Nome de usuário não pode ser vazio!')
            return false
        }
        if (!senha || senha.length < 4) {
            console.log('Senha deve ter no mínimo 4 caracteres')
            return false
        }
        return true
    }

    async function verificarUser(usuarios, nome, senha) {
        console.log('Tentando login...')
        for (let i = 0; i < usuarios.length; i ++) {
            let usuario = usuarios[i]
            if (usuario.nome === nome) {
                let result = await bcrypt.compare(senha, usuario.senha) 
                if (result) {
                    return true
                }  
            }
        }
        return false
        
    }
        
    function valor_a_pagar(tipo_pagamento, quantidade_garrafas) {
        let preco_unitario = 5
        let valor_final = 0
        switch (tipo_pagamento) {
            case 'pix':
                valor_final = (preco_unitario * 0.9) * quantidade_garrafas
                break;
            case 'cartão':
                valor_final = (preco_unitario * 1.05) * quantidade_garrafas
                break;
            case 'dinheiro':
                valor_final = preco_unitario * quantidade_garrafas
                break;
            default:
                return false
        }
        return valor_final
    }
    let escolha = 's'
    while (escolha != 'n') {
        const user = await lerUsers()
        const historico_vendas = await lerVendas()

        let opcao = await menu()

        let verificacao_geral = false

        let validacao = false
        if (opcao === '1') {
            let informacoes = await criarConta()
            if (validarCadastro(informacoes[0], informacoes[1])) {
                let hash = await bcrypt.hash (informacoes[1], 10) 
                for (let i = 0; i < user.length; i++) {
                    let usuario = user[i]
                    if (informacoes[0] === usuario.nome) {
                        validacao = true
                    }
                }
                if (!validacao) {
                    user.push({ nome: informacoes[0], senha: hash })
                    await salvarUsers(user)
                    console.log(`Usuário "${informacoes[0]}" criado com sucesso!`)
                    verificacao_geral = true
                    console.log()
                }
                else {
                    console.log(`Usuário "${informacoes[0]}" já criado!`)
                    console.log()
                    let senhaDigitada = prompt('Digite a senha para fazer login: ')
                    let result = await verificarUser(user, informacoes[0], senhaDigitada)
                    if (result) {
                        verificacao_geral = true
                        console.log('Login realizado!')
                        console.log()
                    }
                   
                }
            }
        }
        else if (opcao === '2') {
            console.log()
            let login = await fazerLogin()
            let veri_ok = await verificarUser(user, login[0], login[1])
            if (veri_ok) {
                verificacao_geral = true
                console.log('Login realizado!')
                console.log()
            }
            else {
                console.log('Erro ao fazer login!')
            }
        } 
        else {
            console.log(`Opção "${opcao}" inválida!`)
        }
        if (verificacao_geral) {
            let nome_cliente = prompt('Digite o nome do cliente: ')
            let qnt_garrafas = prompt('Quantidade de garrafas compradas: ')
            let tp_pagamento = prompt('Tipo de pagamento usado: ').toLowerCase()
            let total_a_pagar = valor_a_pagar(tp_pagamento, qnt_garrafas)
            if (total_a_pagar) {
                console.log(`Registrando venda de ${qnt_garrafas} garrafas para o(a) cliente "${nome_cliente}"...`)

                historico_vendas.push({cliente: nome_cliente, qnt_garrafas: qnt_garrafas, tipo_pagamento: tp_pagamento, valor_total: total_a_pagar})
                await salvarVendas(historico_vendas)
            }
            else {
                console.log('Tipo de pagamento inválido')
            }
            console.log()
            console.log('Relatório de vendas:')
            for (let i = 0; i < historico_vendas.length; i++) {
                let cliente = historico_vendas[i]
                console.log(`- Cliente: ${cliente.cliente} | Quantidade: ${cliente.qnt_garrafas} | Total: R$${cliente.valor_total.toFixed(2)}`)
            }
            
        }
        escolha = prompt('Usar programa novamente: digite "s" ou "n": ').toLowerCase()
    }
    console.log('Saindo...')
}

main()