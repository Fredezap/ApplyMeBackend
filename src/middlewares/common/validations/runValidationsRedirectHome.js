import { validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'

// TODO: CHEQUEAR QUE FUNCIONE BIEN Y QUE REEDIRECCIONE AL LUGAR CORRESPONDIENTE
const FRONTEND = process.env.FRONTEND_BASE_URL

const runValidationsRedirectHome = (validations) => async(req, res, next) => {
    for (const validation of validations) {
        await validation.run(req)
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const urlError = errors.array().map(error => error.msg).join(', ')
            const url = `${FRONTEND}?Errors=${encodeURIComponent(urlError)}`
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).redirect(url)
        }
    }

    next()
}

export default runValidationsRedirectHome