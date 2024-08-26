import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'
import { userConstants } from '../../../constants/user/userConstants.js'

const { MIN_SURNAME_LENGTH, MAX_SURNAME_LENGTH } = userConstants
const { SURNAME_TOO_SHORT, SURNAME_TOO_LONG, INVALID_SURNAME } = errorCodes.authUserErrors

const validateSurname = check('surname')
    .isString().isLength({ min: MIN_SURNAME_LENGTH }).withMessage(SURNAME_TOO_SHORT)
    .isString().isLength({ max: MAX_SURNAME_LENGTH }).withMessage(SURNAME_TOO_LONG)
    .matches(/^[A-Za-z]+$/).withMessage(INVALID_SURNAME)

export default validateSurname