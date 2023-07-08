import express from 'express'
import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/User'

const router = express.Router()

router.get('', checkToken, async (req: Request, res: Response)=>{
    
    const id = req.params.id

    const user = await User.findById(id,'-password')

    if(!user){
        return res.status(404).json({msg: "Usuário não encontrado."})
    }

    res.status(200).json({user})
})

//Middleware
function checkToken(req:Request, res:Response, next){

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({msg: "Acesso negado!"})
    }

    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)

        next()

    } catch (error) {
        res.status(400).json({msg: "Token Inválido!"})
    }
}

export default router