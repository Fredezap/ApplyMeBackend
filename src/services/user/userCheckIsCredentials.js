import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_CREDENTIALS } = errorCodes.authUserErrors

export const userCheckIsCredentials = async(req, res) => {
    const { email: emailDb, token: tokenDb, role: roleDb } = req.body.user
    const { email, token, role } = req.body

    if (emailDb === email && tokenDb === token && roleDb === role) {
        return res.status(StatusCodes.OK).send()
    }

    const errors = [{ msg: INVALID_CREDENTIALS }]
    return res.status(StatusCodes.UNAUTHORIZED).json({ errors })
}