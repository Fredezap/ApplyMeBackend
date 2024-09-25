import express from 'express'
import authRouter from './routes/authRouter.js'
import { cleanUserData } from './middlewares/auth/validations/cleanUserData.js'
import { upload } from './utils/multerConfig.js'
import adminRouter from './routes/adminRouter.js'
import employeeRouter from './routes/employeeRouter.js'
import userRouter from './routes/userRouter.js'

export const router = express.Router()
router.use('/uploads', express.static('uploads'))
router.use(upload.single('image'))
router.use(cleanUserData)
router.use('/auth', authRouter)
router.use('/admin', adminRouter)
router.use('/user', userRouter)
router.use('/employee', employeeRouter)