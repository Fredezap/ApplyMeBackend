import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import validatePassword from '../middlewares/auth/validations/validatePassword.js'
import validateUniqueEmail from '../middlewares/auth/validations/validateUniqueEmail.js'
import validateName from '../middlewares/auth/validations/validateName.js'
import validateSurname from '../middlewares/auth/validations/validateSurname.js'
import { userRegister } from '../services/user/userRegister.js'
import { hashPassword, checkPassword } from '../middlewares/auth/OAuth/bcrypt.js'
import validateEmailUserExist from '../middlewares/auth/validations/validateEmailUserExist.js'
import { generateJWTToken, verifyTokenJWT } from '../middlewares/auth/OAuth/jwt.js'
import validateConfirmPassword from '../middlewares/auth/validations/validateConfirmPassword.js'
import validatePasswordsMatch from '../middlewares/auth/validations/validatePasswordsMatch.js'
import validatePhoneNumber from '../middlewares/auth/validations/validatePhoneNumber.js'
import capitalizeFullname from '../middlewares/common/validations/capitalizeFullname.js'
import normalizeEmail from '../middlewares/common/validations/normalizeEmail.js'
import { userUpdateToken } from '../services/user/userUpdateToken.js'
import validateRole from '../middlewares/auth/validations/validateRole.js'
import validateToken from '../middlewares/auth/validations/validateToken.js'
import validateUserExistById from '../middlewares/auth/validations/validateUserExistById.js'
import { userCheckIsCredentials } from '../services/user/userCheckIsCredentials.js'
import { cleanUserData } from '../middlewares/auth/validations/cleanUserData.js'
import validateUserId from '../middlewares/auth/validations/validateUserId.js'
import validateEmail from '../middlewares/auth/validations/validateEmail.js'

const authRouter = express.Router()

const registerValidations = runValidations([
    validateName,
    validateSurname,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validatePhoneNumber,
    validatePasswordsMatch,
    validateUniqueEmail
])

const loginValitaions = runValidations([
    validateEmail,
    validatePassword,
    validateEmailUserExist
])

const userPermitionsValidations = runValidations([
    validateUserId,
    validateEmail,
    validateRole,
    validateToken,
    validateUserExistById
])

const print = (req, res, next) => {
    console.log('en print')
    console.log(req.body)
    next()
}

authRouter.post('/register', registerValidations, capitalizeFullname, normalizeEmail, hashPassword, userRegister)
authRouter.patch('/login', loginValitaions, checkPassword, generateJWTToken('7d'), userUpdateToken)
authRouter.post('/check-user-permissions', userPermitionsValidations, verifyTokenJWT, userCheckIsCredentials)

export default authRouter