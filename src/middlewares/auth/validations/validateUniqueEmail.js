import { check } from 'express-validator'
import userService from '../../../services/user/common/userService.js'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { EMAIL_NOT_VALID, EMAIL_ALREADY_IN_USE } = errorCodes.authUserErrors

const validateUniqueEmail = check('email', EMAIL_NOT_VALID).custom(
    async(email) => {
        const user = await userService.findByEmail(email)

        if (!user) {
            return Promise.resolve()
        }

        return Promise.reject(new Error(EMAIL_ALREADY_IN_USE))
    }
)

export default validateUniqueEmail