import { StatusCodes } from 'http-status-codes'
import newsletterUserService from '../newsletter/common/newsletterUserService.js'
import errorCodes from '../../constants/errorCodes.js'
import { newsletterEmailConfirmation } from '../newsletter/register/newsletterEmailConfirmation.js'

const { SERVER_ERROR_OCCURRED } = errorCodes.commonErrors
const { SERVER_ERROR_WHILE_SENDING_EMAIL } = errorCodes.emailErrors

export const userUpdateVerificationCode = async(req, res) => {
    try {
        const { user, verificationToken } = req.body
        const id = user.newsletterUserId
        await newsletterUserService.updateNewsletterUser(id, { verificationToken })
        req.body.user.verificationToken = req.body.verificationToken
        try {
            await newsletterEmailConfirmation(user)
            return res.status(StatusCodes.OK).send()
        } catch (err) {
            throw new Error(SERVER_ERROR_WHILE_SENDING_EMAIL)
        }
    } catch (err) {
        const errors = [{ msg: SERVER_ERROR_OCCURRED }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}