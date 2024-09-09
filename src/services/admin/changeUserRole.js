import { StatusCodes } from 'http-status-codes'
import userService from '../user/common/userService.js'
import errorCodes from '../../constants/errors/errorCodes.js'
const { INVALID_USER_ROLE_TO_CHANGE } = errorCodes.adminErrors
const { SERVER_ERROR_OCCURRED } = errorCodes.commonErrors

export const changeUserRole = async(req, res) => {
    let errors
    try {
        const { role, userId } = req.body.userToChange
        let values
        if (role === 'user') {
            values = { role: 'employee' }
        } else if (role === 'employee') {
            values = { role: 'user' }
        } else {
            errors = [{ msg: INVALID_USER_ROLE_TO_CHANGE }]
            return res.status(StatusCodes.BAD_REQUEST).json({ errors })
        }
        console.log('VALUES: ', values)
        const user2 = await userService.updateUser(values, userId)
        console.log('user2: ', user2)
        const users = await userService.getAll()
        return res.status(StatusCodes.OK).json({ users })
    } catch (err) {
        errors = [{ msg: SERVER_ERROR_OCCURRED }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}