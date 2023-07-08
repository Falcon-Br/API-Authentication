import express from 'express'

import userController from '../controller/userController'

const router: express = express.Router()

router.post('/', userController.login)

export default router