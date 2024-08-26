import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { PASSWORDS_DO_NOT_MATCH } = errorCodes.authUserErrors

const validatePasswordsMatch = check('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error(PASSWORDS_DO_NOT_MATCH)
    }
    return true
})

export default validatePasswordsMatch