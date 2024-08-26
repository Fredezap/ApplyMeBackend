import { check } from 'express-validator'
import { userConstants } from '../../../constants/user/userConstants.js'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { PASSWORD_NOT_VALID, PASSWORD_INVALID_LENGTH } = errorCodes.authUserErrors
const { MIN_PASSWORD_LENGTH } = userConstants

const validatePassword = check('password', PASSWORD_NOT_VALID)
    .isString()
    .isLength({ min: MIN_PASSWORD_LENGTH })
    .withMessage(`${PASSWORD_INVALID_LENGTH}`)

export default validatePassword