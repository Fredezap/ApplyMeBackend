import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'
import { userConstants } from '../../../constants/user/userConstants.js'

const { INVALID_USER_ROLE } = errorCodes.authUserErrors
const { ROLES } = userConstants

const validateRole = check('role')
    .isIn(Object.values(ROLES))
    .withMessage(INVALID_USER_ROLE)

export default validateRole