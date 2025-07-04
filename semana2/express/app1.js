const express = require('express')
const app = express()
app.use(express.json())

// Dado inicial para manipular
let tarefa = {
  id: 1,
  titulo: 'Estudar API',
  status: 'pendente'
}

// GET — pegar a tarefa
app.get('/tarefa', (req, res) => {
  res.json(tarefa)
})

// POST — criar uma tarefa (aqui só simulação, sobrescreve a tarefa atual)
app.post('/tarefa', (req, res) => {
  tarefa = req.body
  res.json({ mensagem: 'Tarefa criada', tarefa })
})

// PUT — substituir a tarefa inteira
app.put('/tarefa', (req, res) => {
  tarefa = req.body
  res.json({ mensagem: 'Tarefa substituída', tarefa })
})

// PATCH — atualizar parte da tarefa
app.patch('/tarefa', (req, res) => {
  tarefa = { ...tarefa, ...req.body }
  res.json({ mensagem: 'Tarefa atualizada', tarefa })
})

// DELETE — deletar a tarefa (aqui só reseta pra um objeto vazio)
app.delete('/tarefa', (req, res) => {
  tarefa = {}
  res.json({ mensagem: 'Tarefa deletada', tarefa })
})

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
