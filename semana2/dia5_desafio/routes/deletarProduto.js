import express from 'express'
import { apenasAdmin, deletarProduto, listarProdutos} from '../produtos-controller.js'
import { validarToken } from '../auth-middlaware.js'

const router = express.Router()

router.delete('/:id', validarToken, apenasAdmin, async (req, res) => {
    const id =  parseInt(req.params.id)
    const produtos = await listarProdutos()
    const id_verificacao = produtos.find(p => p.id === id)
    
    if (!id_verificacao) {
        return res.status(400).send(`Produto com o ID "${id}" não encontrado!`)
    }
    await deletarProduto(id, res)
})

export default router;