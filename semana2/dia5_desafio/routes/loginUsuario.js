// Arquivo de rotas (usando Express Router).

// Aqui você define /cadastro, /login, /perfil, etc.

import express from 'express'
import {LoginDeUsuario } from '../usuarios-controller.js'
const router = express.Router()
router.post('/', LoginDeUsuario, async (req, res) => {
})

export default router;

