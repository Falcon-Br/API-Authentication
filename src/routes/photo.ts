import express from 'express';
import { upload } from '../config/multer';
import photoController from '../controller/photoController';

const router = express.Router()

router.post('/', upload.single('file'), photoController.create)
router.get('/', photoController.findAll)
router.delete('/:id', photoController.remove)

export default router