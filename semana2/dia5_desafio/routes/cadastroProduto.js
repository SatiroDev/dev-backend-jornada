import express from 'express'
import { apenasAdmin, cadastroProduto } from '../produtos-controller.js'
import { validarToken } from '../auth-middlaware.js'

const router = express.Router()
router.post('/', validarToken, apenasAdmin, async (req, res) => {
    const cadastrarProduto = await cadastroProduto(req, res)
})

export default router;