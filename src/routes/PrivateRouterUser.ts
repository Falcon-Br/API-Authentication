import express, { Request, Response } from 'express'
import checkToken from '../middleware/checkToken'

const router = express.Router()

// only authenticated users can see this router and with role: "user"
router.get('/users', checkToken, async (req: Request, res: Response) => {

    if (req.user?.role === 'user') {
        res.json({ msg: 'Rota de usuários protegida' });
    } else {
        res.status(403).json({ msg: 'Acesso negado!' });
    }

})

router.get('/admin', checkToken, async (req: Request, res: Response) =>{

    if(req.user?.role === 'admin'){
        res.json({msg: 'Rota de administradores protegida!'})
    }else{
        res.status(403).json({ msg: 'Acesso negado!' });
    }

})

export default router