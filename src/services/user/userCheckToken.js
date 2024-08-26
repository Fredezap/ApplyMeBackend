import userService from './common/userService.js'
import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_CREDENTIALS } = errorCodes.authUserErrors

export const userCheckToken = async(req, res) => {
    const { email, token } = req.body

    const userDb = await userService.findByEmail(email)

    if (userDb && userDb.token === token) {
        return res.status(StatusCodes.OK).send()
    }

    const errors = [{ msg: INVALID_CREDENTIALS }]
    return res.status(StatusCodes.UNAUTHORIZED).json({ errors })
}