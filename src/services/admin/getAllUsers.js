import { StatusCodes } from 'http-status-codes'
import userService from '../user/common/userService.js'
import errorCodes from '../../constants/errors/errorCodes.js'
const { ERROR_WHILE_GETTING_USERS } = errorCodes.adminErrors

export const getAllUsers = async(req, res) => {
    try {
        const users = await userService.getAll()
        return res.status(StatusCodes.OK).json({ users })
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_GETTING_USERS }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}