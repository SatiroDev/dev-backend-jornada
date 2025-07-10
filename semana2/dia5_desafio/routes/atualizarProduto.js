import express from 'express'
import { apenasAdmin, atualizarProduto} from '../produtos-controller.js'
import { validarToken } from '../auth-middlaware.js'
// import { verificacaoId } from '../usuarios-controller.js'

const router = express.Router()

router.put('/', validarToken, apenasAdmin, async (req, res) => {
    console.log('al')
    const id = parseInt(req.params.id)
    console.log('aqq')
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
    // const verificarId = await verificacaoId(req.user.id)
    // if (verificarId.length === 0){
    //     return res.status(404).send(`Usuário com o ID "${id}" não encontrado!`)
    // }
    await atualizarProduto(campo, informacoes, id, res)
})

export default router;