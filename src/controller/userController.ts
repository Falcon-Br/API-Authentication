import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from '../models/User'
import { AuthPayload } from '../interfaces/types'

const userController = {

    register: async function (req:Request, res: Response){
    
        const {name, email, password, confirmPassword, role} = req.body
    
        if(!name){
            return res.status(422).json({msg: "O campo nome é obrigatório"})
        }
    
        if(!email){
            return res.status(422).json({msg: "O campo email é obrigatório"})
        }
    
        if(!password){
            return res.status(422).json({msg: "O campo senha é obrigatório"})
        }
    
        if(password !== confirmPassword){
            return res.status(422).json({msg: "As senhas não conferem."})
        }
    
        //check if user exists
        const userExists = await User.findOne({email: email})
    
        if(userExists){
            return res.status(409).json({msg: "E-mail já cadastrado, utilize outro e-mail."})
        }
    
        //create password 
        const salt: number = await bcrypt.genSalt(12) // insert a random sequences of characters to the password
        const passwordHash: String = await bcrypt.hash(password, salt) // Encrypted password with salt
    
        //create user
        const user = new User({
            name,
            email,
            password: passwordHash,
            role
        })
    
        try{
            await user.save()
            res.status(201).json({msg:"Usuário criado com sucesso!"})
    
        }catch(error){
            console.log(error)
            res.status(500).json({msg: "Aconteceu um erro no servidor, tente novamente mais tarde."})
        }
    },

    login: async function login(req:Request, res:Response){

        const {email, password} = req.body
    
        if(!email){
            return res.status(406).json({msg: "O campo email é obrigatório"})
        }
    
        if(!password){
            return res.status(406).json({msg: "O campo senha é obrigatório"})
        }
    
        //check if user exist
        const user = await User.findOne({ email: email });
    
        if(!user){
            return res.status(401).json({msg: "Usuário não encontrado"})
        }
    
        // check if password match
        const checkPassword: string = await bcrypt.compareSync(password, user.password)
    
        if(!checkPassword){
            return res.status(422).json({msg: "Senha Inválida"})
        }
    
        try{
            const payload: AuthPayload = {
                userId: user._id,
                role: user.role,
              };

            const secret = process.env.SECRET
    
            const token = jwt.sign(payload, secret)
    
            res.header('token', token)
            res.status(200).json({msg: "Autenticação realizada com sucesso!", token})
    
        }catch(error){
            console.log(error)
            res.status(500).json({msg: "Aconteceu um erro no servidor, tente novamente mais tarde."})
        }
    },

    logout: async function login(req:Request, res:Response){
        const {email, password} = req.body

        const user = await User.findOne({ email: email });
        if(!user){
            return res.status(401).json({msg: "Usuário não encontrado"})
        }
        
        try{
            //Error: Objeto vindo vazio
            const payload: AuthPayload = {
                userId: user._id,
                role: user.role,
              };

            const secret = process.env.SECRET

            //Expires Token immediately   
            const token = jwt.sign(payload, secret, {expiresIn: 1})
    
            res.header('token', token)
            res.status(200).json({msg: "Logout feito com sucesso", token})
    
        }catch(error){
            console.log(error)
            res.status(500).json({msg: "Aconteceu um erro no servidor, tente novamente mais tarde."})
        }

    }
}

export default userController