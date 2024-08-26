import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { INVALID_PHONE_NUMBER } = errorCodes.authUserErrors

const validatePhoneNumber = check('phone')
    .isString().matches(/^[0-9]+$/).withMessage(INVALID_PHONE_NUMBER)

export default validatePhoneNumber