import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { INVALID_CREDENTIALS } = errorCodes.authUserErrors
const { SERVER_ERROR_OCCURRED } = errorCodes.commonErrors

// Password hashing middleware
export const hashPassword = async(req, res, next) => {
    const { password } = req.body
    try {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password, salt)
        delete req.body.confirmPassword
        req.body.password = hashedPassword
        next()
    } catch (error) {
        const errors = [{ msg: SERVER_ERROR_OCCURRED }]
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}

// Password verifying middleware
export const checkPassword = async(req, res, next) => {
    const { password: plainPassword, user: { password: DbHashedPassword } } = req.body
    try {
        const isMatch = await bcrypt.compare(plainPassword, DbHashedPassword)
        if (isMatch) {
            next()
        } else {
            const errors = [{ msg: INVALID_CREDENTIALS }]
            res.status(StatusCodes.UNAUTHORIZED).json({ errors })
        }
    } catch (error) {
        const errors = [{ msg: SERVER_ERROR_OCCURRED }]
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}