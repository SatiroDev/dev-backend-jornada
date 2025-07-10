import { conexao } from './conexao.js'
import { cadastroDeUsuario } from './usuarios-controller.js'



export const listarProdutos = async () => {
    const [selectTabelaProdutos] = await conexao.execute(
        `select * from produtos`
    )
    return selectTabelaProdutos
}

export const apenasAdmin = async (req, res, next) => {
    if (req.user.tipo.toLowerCase() !== 'admin') {
        console.log('Nao admin')
        return res.status(403).send('Função apenas para admins!')
    }
    console.log('uaii')
    next()
}

export const validacaoProdutos = async (req, res) => {
    let disponivel = "false"
    let categoriaCerta = "null"
    if (!req.nome || req.nome.trim() === '') return res.status(400).send('Campo "nome" está com erro!')
    if (!req.preco) return res.status(400).send('Campo "preço" está com erro!')
    if (req.quantidade_estoque === undefined || req.quantidade_estoque < 0) return res.status(400).send('Campo "quantidade_estoque" está com erro!')
    if (req.quantidade_estoque > 0) {
        disponivel = "true"
    }
    if (req.categoria.trim()) {
        categoriaCerta = req.categoria
    }
    return {nome: req.nome, preco: req.preco, categoria: categoriaCerta, quantidade_estoque: req.quantidade_estoque, disponivel: disponivel}
}

export const cadastroProduto = async (req, res) => {
    try {
        const produto = await validacaoProdutos(req.body)
        if (produto){
            const [insert] = await conexao.execute(
                `insert into produtos (nome, preco, categoria, quantidade_estoque, disponivel)
                values (?, ?, ?, ?, ?)`,
                [produto.nome.toLowerCase(), produto.preco, produto.categoria.toLowerCase(), produto.quantidade_estoque, produto.disponivel.toLowerCase()]
            )
            console.log(`Produto "${produto.nome}" cadastrado com sucesso!`)
            return res.send(`Produto "${produto.nome}" cadastrado com sucesso!`)
        }
        return res.status(401).send('Erro ao cadastrar produto!')
    } catch (error) {
        console.log('Erro ao cadastrar produto ', error)
        return res.status(401).send('Erro ao cadastrar produto', error)
    }
} 

export const atualizarProduto = async (campos, infos, id, res) => {
    try {
        console.log('chegou aq')
        let verificacaoQuantidade = 0
        for (let i = 0; i < campos.length; i++) {
            const [updateInformacoes] = conexao.execute(
                ` update produtos set ${campos[i]} = ?
                where id = ?`,
                [infos[i], id]
            )
            if (updateInformacoes) {
                verificacaoQuantidade += 1
            }
        }
        if (verificacaoQuantidade !== infos.length || campos.length === 0) {
            return res.status(400).send('Erro em atualizar informações do produto!')
        }
        return res.send(`Atualização feita com sucesso no produto com ID "${id}"!`)
        
    } catch (error) {
        console.log('Erro ao cadastrar produto ', error)
        return res.status(401).send('Erro ao cadastrar produto', error)
    }
}


// produtos-controller.js

// Funções para:

// Criar produto (POST)

// Listar todos (GET)

// Listar por filtros (query: nome, preço, etc)

// Atualizar (PUT)

// Deletar (DELETE)



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