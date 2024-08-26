import { StatusCodes } from 'http-status-codes'
import userService from './common/userService.js'
import userErrorCodes from '../../constants/errors/errorCodes.js'

const { ERROR_WHILE_CREATING_USER } = userErrorCodes.authUserErrors
export const userRegister = async(req, res) => {
    try {
        const user = await userService.registerUser(req.body)
        return res.status(StatusCodes.CREATED).json({ email: user.dataValues.email })
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_CREATING_USER }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}