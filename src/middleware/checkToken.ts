import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { AuthPayload } from '../interfaces/types'

//Verify Token JWT in protected Routers
function checkToken(req: Request, res: Response, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    let payload: AuthPayload

    if (!token) {
        return res.status(401).json({ msg: "Acesso negado!" })
    }

    const secret = process.env.SECRET
    jwt.verify(token, secret, (err, payload: AuthPayload) => {
        if (err) {
            return res.status(403).json({ msg: "Token Inválido!" })
        }
        req.user = payload //Add payload to the object of the request to be used on later in protected routers

        next()
    })
}

export default checkToken