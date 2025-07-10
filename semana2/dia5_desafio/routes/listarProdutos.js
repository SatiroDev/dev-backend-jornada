
import express from 'express'
import {listarProdutos, apenasAdmin} from '../produtos-controller.js'
import { validarToken } from '../auth-middlaware.js'
const router = express.Router()

router.get('/', validarToken, async (req, res) => {
    const produtos = await listarProdutos()
    res.json(produtos)
})

export default router;

