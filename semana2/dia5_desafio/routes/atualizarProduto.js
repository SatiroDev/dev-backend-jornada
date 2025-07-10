import express from 'express'
import { apenasAdmin, atualizarProduto, listarProdutos} from '../produtos-controller.js'
import { validarToken } from '../auth-middlaware.js'

const router = express.Router()

router.put('/:id', validarToken, apenasAdmin, async (req, res) => {
    const id =  parseInt(req.params.id)
    const produtos = await listarProdutos()
    const id_verificacao = produtos.find(p => p.id === id)
    if (!id_verificacao) {
        return res.status(400).send(`Produto com o ID "${id}" não encontrado!`)
    }
    const {nome, preco, categoria,  quantidade_estoque} = req.body
    let campo = []
    let informacoes = []
    let disponivel = "false"
    if (nome && nome.trim() !== '') {
        informacoes.push(nome)
        campo.push("nome")
    }
    if (preco && preco >= 0) {
        informacoes.push(preco)
        campo.push("preco")
    }

    if (categoria && categoria.trim !== '') {
        informacoes.push(categoria)
        campo.push("categoria")
    }

    if (quantidade_estoque >= 0) {
        informacoes.push(quantidade_estoque)
        campo.push("quantidade_estoque")
        if (quantidade_estoque > 0) {
            disponivel = "true"
        }
        informacoes.push(disponivel)
        campo.push("disponivel")
        
    }
    await atualizarProduto(campo, informacoes, id, res)
})

export default router;