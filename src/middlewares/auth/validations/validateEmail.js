import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { EMAIL_NOT_VALID } = errorCodes.authUserErrors

const validateEmail = check('email', EMAIL_NOT_VALID).exists().isEmail()

export default validateEmail