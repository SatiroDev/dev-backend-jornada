const prompt = require('prompt-sync')()

async function main() {
    const fs = require('fs/promises')

    function menu() {
        console.log('-=-'.repeat(10))
        console.log('-=-=-=-=-=-= MENU =-=-=-=-=-=-')
        console.log('1. Adicionar tarefa')
        console.log('2. Listar tarefas pendentes')
        console.log('3. Marcar tarefa como concluída')
        console.log('4. Excluir tarefa')
        console.log('5. Sair')
    }

    function validarTarefa(tarefa) {
        if (!tarefa || tarefa.trim() === '') {
            
            console.log('-=-'.repeat(10))
            console.log('Tarefa não pode ser deixada em branco!')
            console.log('-=-'.repeat(10))
            return false
        }
        return true
    }
    async function salvarInformacoes(lista) {
        await fs.writeFile('semana1/dia7_to_do_list/tarefas.json', JSON.stringify(lista, null, 2))
    }
    async function carregarTarefas() {
        let conteudo = await fs.readFile('semana1/dia7_to_do_list/tarefas.json', 'utf-8')
        return JSON.parse(conteudo)
    }

    async function addTarefa() {
        
        console.log('-=-'.repeat(10))
        let titulo = prompt('Título da tarefa que deseja adicionar: ')
        let descricao = prompt('Descrição da tarefa: ')
        if (validarTarefa(titulo)) {
            return [titulo, descricao]
        }
        return false
    }

    function listarTaredas(tarefas) {
        
        console.log('-=-'.repeat(10))
        console.log('Tarefas adicionadas:')
        console.log('-=-'.repeat(10))
        
        for (let i = 0; i < tarefas.length; i ++) {
            let tarefa = tarefas[i]
            console.log(`Tarefa: ${tarefa.titulo}`)
            console.log(`Descrição: ${tarefa.descricao}`)
            console.log(`Status: ${tarefa.status}`)
            
        }
    }

    function tarefasADD (tarefas) {
        console.log('Tarefas adicionadas')
        for (let i = 0; i < tarefas.length; i ++ ) {
            let tarefa = tarefas[i]
            console.log(`Tarefa: ${tarefa.titulo}`)
        }
    }
    async function marcarTarefa(tarefas) {
        
        console.log('-=-'.repeat(10))
        tarefasADD(tarefas)
        console.log('-=-'.repeat(10))
        
        let titulo_tarefa = prompt('Título da tarefa que não está mais pendente: ')
        for (let i = 0; i < tarefas.length; i ++ ) {
            let tarefa = tarefas[i]
            if (titulo_tarefa === tarefa.titulo){
                tarefa.status = 'Completa'
                console.log(`Tarefa "${tarefa.titulo}" marcada como "completa" com sucesso!`)
                return true
            }
        }
        return [false, titulo_tarefa]
    } 

    async function excluirTarefa(tarefas) {
        
        console.log('-=-'.repeat(10))
        tarefasADD(tarefas)
        console.log('-=-'.repeat(10))
        
        let titulo_tarefa = prompt('Tarefa que deseja excluir: ')
        for (let i = 0; i < tarefas.length; i ++ ) {
            let tarefa = tarefas[i]
            if (titulo_tarefa === tarefa.titulo){
                tarefas.splice(i,1)
                console.log(`Tarefa "${tarefa.titulo}" excluída com sucesso!`)
                return true
            }
        }
        return [false, titulo_tarefa]

    }
    let escolha = '0'
    
    while (escolha != '5') {
        const tarefas = await carregarTarefas()
        menu()
        escolha = prompt('Escolha uma opção: ')
        switch (escolha) {
            case '1':
                let titulo_desc =  await addTarefa()
                if (titulo_desc != false) {
                    tarefas.push({titulo: titulo_desc[0], descricao: titulo_desc[1], status: 'Pendente'})
                    console.log(`Tarefa "${titulo_desc[0]}" adicionada com sucesso!`)
                    await salvarInformacoes(tarefas)
                }
                else {
                    console.log('Erro ao adicionar tarefa!')
                }
                break;
            case '2':
                if (tarefas.length >= 1) {
                    listarTaredas(tarefas)
                }
                else {
                    console.log('Primeiro você tem que adicionar uma tarefa!')
                }
                break;
            case '3':
                if (tarefas.length >= 1) {
                    let marcar_tarefa = await marcarTarefa(tarefas)
                    if (marcar_tarefa[0] === false) {
                        console.log(`Tarefa "${marcar_tarefa[1]}" não encontrada!`)
                    }
                    else {
                        await salvarInformacoes(tarefas)
                    }
                }
                else {
                    console.log('Primeiro você tem que adicionar uma tarefa!')
                }
                break;
            case '4':
                if (tarefas.length >= 1) {
                    let excluirVerificacao = await excluirTarefa(tarefas)
                    if (excluirVerificacao[0] === false) {
                        console.log(`Tarefa "${excluirVerificacao[1]}" não encontrada!`)
                    }
                    else {
                        await salvarInformacoes(tarefas)
                    }
                }
                else {
                    console.log('Primeiro você tem que adicionar uma tarefa!')
                }
                break;
            case '5':
                console.log('Saindo do programa...')
                console.log('-=-'.repeat(10))
                break;
            default:
                console.log(`Opção "${escolha} inválida`)
                break;
        }
    }
}
main()
