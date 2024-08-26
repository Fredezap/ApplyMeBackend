import { check } from 'express-validator'
import userService from '../../../services/user/common/userService.js'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { USER_NOT_FOUND } = errorCodes.authUserErrors

const validateUserExistById = check('userId', USER_NOT_FOUND).custom(
    async(userId, { req }) => {
        const user = await userService.findByUserId(userId)

        if (user) {
            req.body.user = user
            return Promise.resolve()
        }

        return Promise.reject(new Error(USER_NOT_FOUND))
    }
)

export default validateUserExistById