
const bcrypt = require('bcrypt')
async function main() {
    const fs = require('fs/promises')

    async function lerUsers() {
        let conteudo = await fs.readFile('semana1/dia7_projeto/bd_usuarios.json', 'utf-8')
        return JSON.parse(conteudo)
    }
    async function lerVendas() {
        let conteudo = await fs.readFile('semana1/dia7_projeto/bd_vendas.json', 'utf-8')
        return JSON.parse(conteudo)
    }

    async function salvarUsers(lista) {
        await fs.writeFile('semana1/dia7_projeto/bd_usuarios.json', JSON.stringify(lista, null, 2))
    }

    async function salvarVendas(lista) {
        await fs.writeFile('semana1/dia7_projeto/bd_vendas.json', JSON.stringify(lista, null, 2))
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

    const user = await lerUsers()
    const historico_vendas = await lerVendas()

    let nomeUser = 'admin'
    let senharUser = '1234'
    if (validarCadastro(nomeUser, senharUser)) {
        let hash = await bcrypt.hash (senharUser, 10) 
        user.push({ nome: nomeUser, senha: hash })
        await salvarUsers(user)
        console.log(`Usuário "${nomeUser}" criado com sucesso!`)
        console.log()
        let nomeDigitado = 'admin'
        let senhaDigitada = '1234'
        let veri_ok = await verificarUser(user, nomeDigitado, senhaDigitada)
        if (veri_ok) {
            console.log('Login realizado!')
            console.log()
            let nome_cliente = 'Jorge'
            let qnt_garrafas = 5
            let tp_pagamento = 'dinheir'
            let total_a_pagar = valor_a_pagar(tp_pagamento, qnt_garrafas)
            if (total_a_pagar != false) {
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
        else { 
            console.log('Erro ao fazer login!')
        }
    }
}

main()