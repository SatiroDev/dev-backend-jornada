import jwt from 'jsonwebtoken'
import { secret_key } from '../secret_key/secretKey.js' 
const secretKey = secret_key
export const validarToken = async(req, res, next) => {
    const authHeader = req.headers['authorization']
    
    const token = authHeader?.split(' ')[1]

    if (!token) {
        return res.status(401).send('Token inválido ou mal formatado!')
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).send('Token inválido ou expirado!')

        req.user = user
        next()
    })
}