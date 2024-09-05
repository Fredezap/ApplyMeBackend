import express from 'express'
import authRouter from './routes/authRouter.js'
import taskRouter from './routes/taskRouter.js'
import { cleanUserData } from './middlewares/auth/validations/cleanUserData.js'
import { upload } from './utils/multerConfig.js'

export const router = express.Router()
router.use('/uploads', express.static('uploads'))
router.use(upload.single('image'))
router.use(cleanUserData)
router.use('/auth', authRouter)
router.use('/task', taskRouter)