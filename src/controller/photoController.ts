import { Request, Response } from 'express';
import Photo from '../models/Photo';
import fs from 'fs'

const photoController = {
    create: async function (req: Request, res: Response) {
        try {
            const {name} = req.body
            const file = req.file
            const photo = new Photo({
                name,
                src: file.path,
            })

            await photo.save()
            res.json({photo, msg: "Imagem salva com sucesso"})
        } catch (error) {
            res.status(500).json({msg: "Erro ao salvar a imagem."})
        }
    },
    findAll: async function (req: Request, res: Response) {
        try {
            const photos =  await Photo.find()
            res.json(photos)
        } catch (error) {
            res.status(500).json({msg: "Erro ao buscar todas as imagens."})    
        }
    },
    remove: async function (req: Request, res: Response) {
        try {
            const photo = await Photo.findById(req.params.id)

            if(!photo){
                return res.status(404).json({msg: "Imagem não encontrada."})
            }

            fs.unlinkSync(photo.src)
            await photo.deleteOne()

            res.json({msg: "Imagem removida com sucesso."})

        } catch (error) {
            res.status(500).json({msg: "Erro ao excluir imagem."})    
            
        }
    }
}

export default photoController