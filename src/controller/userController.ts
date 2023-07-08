import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from '../models/User'

const userController = {

    register: async function (req:Request, res: Response){
    
        const {name, email, password, confirmPassword} = req.body
    
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
            return res.status(422).json({msg: "E-mail já cadastrado, utilize outro e-mail."})
        }
    
        //create password 
        const salt: number = await bcrypt.genSalt(12)
        const passwordHash: String = await bcrypt.hash(password, salt)
    
        //create user
        const user = new User({
            name,
            email,
            password: passwordHash
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
            return res.status(422).json({msg: "O campo email é obrigatório"})
        }
    
        if(!password){
            return res.status(422).json({msg: "O campo senha é obrigatório"})
        }
    
        //check if user exist
        const user = await User.findOne({ email: email });
    
        if(!user){
            return res.status(404).json({msg: "Usuário não encontrado"})
        }
    
        // check if password match
        const checkPassword: string = await bcrypt.compareSync(password, user.password)
    
        if(!checkPassword){
            return res.status(422).json({msg: "Senha Inválida"})
        }
    
        try{
            const secret = process.env.SECRET
    
            const token = jwt.sign({id: user._id}, secret)
    
            res.header('token', token)
            res.status(200).json({msg: "Autenticação realizada com sucesso!", token})
    
        }catch(error){
            console.log(error)
            res.status(500).json({msg: "Aconteceu um erro no servidor, tente novamente mais tarde."})
        }
    }
}

export default userController