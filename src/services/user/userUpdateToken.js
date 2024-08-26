import { StatusCodes } from 'http-status-codes'
import userService from './common/userService.js'
import userErrorCodes from '../../constants/errors/errorCodes.js'

const { SERVER_ERROR_OCCURRED } = userErrorCodes.commonErrors

export const userUpdateToken = async(req, res) => {
    try {
        const values = { token: req.body.token }
        const userId = req.body.user.userId
        const updatedUser = await userService.updateUser(values, userId)
        const filteredUser = userService.filterUserData(updatedUser)
        return res.status(StatusCodes.OK).json({ filteredUser })
    } catch (error) {
        const errors = [{ msg: SERVER_ERROR_OCCURRED }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}