import { check } from 'express-validator'
import { userConstants } from '../../../constants/user/userConstants.js'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { CONFIRM_PASSWORD_NOT_VALID, CONFIRM_PASSWORD_INVALID_LENGTH } = errorCodes.authUserErrors
const { MIN_PASSWORD_LENGTH } = userConstants

const validateConfirmPassword = check('confirmPassword', CONFIRM_PASSWORD_NOT_VALID)
    .isString()
    .isLength({ min: MIN_PASSWORD_LENGTH })
    .withMessage(`${CONFIRM_PASSWORD_INVALID_LENGTH}`)

export default validateConfirmPassword