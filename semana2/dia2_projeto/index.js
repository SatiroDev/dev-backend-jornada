import express from 'express'
import { atualizarNome, atualizarSenha, mostrarUsuarios, mostrarUsuario, verificarNome, criarUsuario, verificarNomeSenha } from "./auth-controller.js";
// auth/index.js
const usuarios = await mostrarUsuarios()

const app = express()

const port = 3000