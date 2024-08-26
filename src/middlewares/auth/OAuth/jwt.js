import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'
import { promisify } from 'util'
import errorCodes from '../../../constants/errors/errorCodes.js'

const signAsync = promisify(jwt.sign)
const verifyAsync = promisify(jwt.verify)
const secretKey = process.env.JWT_SECRET

const {
    INVALID_CREDENTIALS,
    TOKEN_HAS_EXPIRED,
    UNKNOWN_ERROR_WHILE_VERIFYING_TOKEN
} = errorCodes.authUserErrors

const { SERVER_ERROR_OCCURRED } = errorCodes.commonErrors

const FRONTEND = process.env.FRONTEND_BASE_URL
let errors

export const generateJWTToken = (time) => {
    return async(req, res, next) => {
        const { username, email, user } = req.body
        const userId = user.userId
        const payload = { username, email, userId }

        try {
            const token = await signAsync(payload, secretKey, { expiresIn: time })
            req.body.token = token
            next()
        } catch (error) {
            errors = [{ msg: SERVER_ERROR_OCCURRED }]
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
        }
    }
}

export const verifyTokenJWT = async(req, res, next) => {
    try {
        const { token } = req.body
        const decoded = await verifyAsync(token, secretKey)
        req.body.decoded = decoded
        next()
    } catch (err) {
        let errors
        if (err instanceof jwt.TokenExpiredError) {
            errors = [{ msg: TOKEN_HAS_EXPIRED }]
            return res.status(StatusCodes.UNAUTHORIZED).json({ errors })
        } else if (err instanceof jwt.JsonWebTokenError) {
            errors = [{ msg: INVALID_CREDENTIALS }]
            return res.status(StatusCodes.UNAUTHORIZED).json({ errors })
        } else {
            errors = [{ msg: UNKNOWN_ERROR_WHILE_VERIFYING_TOKEN }]
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
        }
    }
}

// TODO: Revisar si me sirve para reenviar email con token nuevo a futuro
// export const verifyTokenEmailJWT = ({ action }) => {
//     return async(req, res, next) => {
//         let error
//         const { verificationToken, user } = req.query

//         try {
//             await verifyAsync(verificationToken, secretKey)
//             return next()
//         } catch (err) {
//             if (err instanceof jwt.TokenExpiredError) {
//                 error = YOUR_TOKEN_HAS_EXPIRED_WE_HAVE_SENT_YOU_AN_EMAIL_WITH_NEW_CREDENTIALS
//             } else if (err instanceof jwt.JsonWebTokenError) {
//                 error = INVALID_TOKEN_WE_HAVE_SENT_YOU_AN_EMAIL_WITH_NEW_CREDENTIALS
//             } else {
//                 error = UNKNKNOWN_ERROR_WHILE_VERIFYING_TOKEN_WE_HAVE_SENT_YOU_AN_EMAIL_WITH_NEW_CREDENTIALS
//             }
//             try {
//                 const result = await generateToken(user.email)
//                 if (!result.success) {
//                     throw new Error(result.error)
//                 }

//                 if (user instanceof NewsletterUser) {
//                     user.verificationToken = result.token
//                     await user.save()
//                 }

//                 if (action === 'unsubscribe') {
//                     await sendEmailUnsubscribeNewToken(user.username, user.email, result.token)
//                 } else if (action === 'verifyAccount') {
//                     await sendEmailVerifyAccountNewToken(user.username, user.email, result.token)
//                 }
//             } catch (err) {
//                 error = INVALID_CREDENTIALS_PLEASE_TRY_AGAIN_LATER_OR_CONTACT_US
//             }

//             const url = `${FRONTEND}?Errors=${encodeURIComponent(error)}`
//             return res.status(StatusCodes.UNAUTHORIZED).redirect(url)
//         }
//     }
// }