import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import userService from './common/userService.js'

const { INVALID_CREDENTIALS } = errorCodes.authUserErrors

export const userCheckIsCredentials = async(req, res) => {
    const { user } = req.body
    const { email: emailDb, token: tokenDb, role: roleDb } = user
    const { email, token, role } = req.body

    if (emailDb === email && tokenDb === token && roleDb === role) {
        const filteredUser = userService.filterUserData(user)
        return res.status(StatusCodes.OK).json({ user: filteredUser })
    }

    const errors = [{ msg: INVALID_CREDENTIALS }]
    return res.status(StatusCodes.UNAUTHORIZED).json({ errors })
}