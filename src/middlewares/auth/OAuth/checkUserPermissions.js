import errorCodes from '../../../constants/errors/errorCodes.js'
import { StatusCodes } from 'http-status-codes'
import { apiInstance } from '../../../utils/apiInstance.js'
const { PLEASE_LOGIN, YOU_DO_NOT_HAVE_PERMISSIONS_TO_ACCESS_THIS_SECTION } = errorCodes.authUserErrors

export const checkUserPermissions = ({ role }) => {
    return async(req, res, next) => {
        let errors
        const url = '/auth/check-user-permissions'

        try {
            const response = await apiInstance.post(url, req.body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.status >= 200 && response.status < 300) {
                if (req.body.role === role) {
                    next()
                } else {
                    errors = [{ msg: YOU_DO_NOT_HAVE_PERMISSIONS_TO_ACCESS_THIS_SECTION }]
                    return res.status(StatusCodes.FORBIDDEN).json({ errors })
                }
            } else {
                errors = [{ msg: PLEASE_LOGIN }]
                return res.status(StatusCodes.FORBIDDEN).json({ errors })
            }
        } catch (error) {
            console.log('en catch')
            errors = [{ msg: PLEASE_LOGIN }]
            console.log(errors)
            return res.status(StatusCodes.FORBIDDEN).json({ errors })
        }
    }
}