import { StatusCodes } from 'http-status-codes'
import userService from '../user/common/userService.js'
import errorCodes from '../../constants/errors/errorCodes.js'
const { ERROR_WHILE_GETTING_USERS } = errorCodes.adminErrors

export const getAllUsers = async(req, res) => {
    try {
        const employeesUsers = await userService.getAllEmployeeUsers()
        const commonUsers = await userService.getAllCommonUsers()
        return res.status(StatusCodes.OK).json({ employeesUsers, commonUsers })
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_GETTING_USERS }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}