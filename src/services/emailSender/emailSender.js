import errorCodes from '../../constants/errorCodes.js'
import { transporter } from '../../emailConfig/emailConfig.js'

const { FAILED_TO_SEND_EMAIL } = errorCodes.emailErrors

export const emailSender = async(mailOptions) => {
    if (!mailOptions || typeof mailOptions !== 'object') {
        throw new Error(FAILED_TO_SEND_EMAIL)
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        throw new Error(FAILED_TO_SEND_EMAIL)
    }
}