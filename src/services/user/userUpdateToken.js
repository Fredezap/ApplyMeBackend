import { StatusCodes } from 'http-status-codes'
import userService from './common/userService.js'
import userErrorCodes from '../../constants/errors/errorCodes.js'

const { SERVER_ERROR_OCCURRED } = userErrorCodes.commonErrors

export const userUpdateToken = async(req, res) => {
    try {
        const { user, token } = req.body
        const userId = user.userId
        console.log('USER ANTES DEL UPDATE: ', user)
        await userService.updateUser({ token }, userId)
        user.token = token
        const filteredUser = userService.filterUserData(user)
        return res.status(StatusCodes.OK).json({ user: filteredUser })
    } catch (error) {
        const errors = [{ msg: SERVER_ERROR_OCCURRED }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}