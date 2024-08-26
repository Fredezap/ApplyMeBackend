import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'
import { userConstants } from '../../../constants/user/userConstants.js'

const { MIN_NAME_LENGTH, MAX_NAME_LENGTH } = userConstants
const { NAME_TOO_SHORT, NAME_TOO_LONG, INVALID_NAME } = errorCodes.authUserErrors

const validateName = check('name')
    .isString().isLength({ min: MIN_NAME_LENGTH }).withMessage(NAME_TOO_SHORT)
    .isString().isLength({ max: MAX_NAME_LENGTH }).withMessage(NAME_TOO_LONG)
    .matches(/^[A-Za-z]+$/).withMessage(INVALID_NAME)

export default validateName