import PromptSync from "prompt-sync"
const prompt = PromptSync()
const user = []

const verificarInformacoes = async (nome, senha) => {
    if (!nome || nome.trim() === '') {
        console.log('')
    }
    if (!nome || senha.length < 4) {
        console.log('Algum dado inválido!')
        return false
    }
    return true


}

export const criarUsuario = async () => {
    let nome = prompt('Nome de usuário: ')
    let senha = prompt('Crie uma senha: (MÍNIMO 4 caracteres) ')

    const verificacao = await verificarInformacoes(nome, senha)
    if (verificacao) {
        user.push({nome, senha})
        return `Usuário "${nome}" adicionado!`
    }
    return 'Usuário nao criado!'
}

await criarUsuario()

// ou seja, as funções, por exemplo, criar usuário, mostrar usuário, login, registrar usuário, etc