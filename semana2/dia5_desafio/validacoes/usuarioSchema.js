// Se for usar Joi, coloque aqui os esquemas de validação dos campos (nome, senha, etc.).
import Joi from "joi";

export const validacaoNomeSenha = async (req) => {
    const validacao = Joi.object({
        nome: Joi.string().min(4).required(),
        senhaStr: Joi.string().min(4).required()
    })
    const { error } = validacao.validate(req)
    if (error) {
        return false
    }
    return true
}
