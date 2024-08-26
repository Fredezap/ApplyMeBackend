import { check } from 'express-validator'
import userService from '../../../services/user/common/userService.js'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { EMAIL_NOT_REGISTRATED } = errorCodes.authUserErrors

const validateEmailUserExist = check('email', EMAIL_NOT_REGISTRATED).custom(
    async(email, { req }) => {
        const user = await userService.findByEmail(email)

        if (user) {
            req.body.user = user
            return Promise.resolve()
        }

        return Promise.reject(new Error(EMAIL_NOT_REGISTRATED))
    }
)

export default validateEmailUserExist