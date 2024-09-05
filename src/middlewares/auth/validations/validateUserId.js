import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { INVALID_USER_ID } = errorCodes.authUserErrors

const validateUserId = check('userId')
    .exists()
    .isUUID().withMessage(INVALID_USER_ID)

export default validateUserId