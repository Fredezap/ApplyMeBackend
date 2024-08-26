import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { INVALID_CREDENTIALS } = errorCodes.authUserErrors

const validateToken = check('token', INVALID_CREDENTIALS).exists().isString().isLength({ min: 20 })

export default validateToken