import express from 'express'
import { cadastroDeUsuario } from '../usuarios-controller.js'

const router = express.Router()

router.post('/', cadastroDeUsuario, async (req, res) => {
    const usuarios = await listarUsuarios()
    res.json(usuarios)
})

export default router;