import express from 'express'
import { Request, Response } from 'express';

const router = express.Router()

// Open Route - Public Router
router.get('/', (req: Request, res: Response)=>{
    res.status(200).json({msg: "Bem vindo a API!"})
})

export default router