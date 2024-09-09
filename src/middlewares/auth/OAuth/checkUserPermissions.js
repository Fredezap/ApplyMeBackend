import errorCodes from '../../../constants/errors/errorCodes.js'
import { StatusCodes } from 'http-status-codes'
import { apiInstance } from '../../../utils/apiInstance.js'
const { PLEASE_LOGIN, YOU_DO_NOT_HAVE_PERMISSIONS_TO_ACCESS_THIS_SECTION } = errorCodes.authUserErrors

export const checkUserPermissions = ({ role }) => {
    return async(req, res, next) => {
        console.log('EN CHECK: ', req.body)
        let errors
        const url = '/auth/check-user-permissions'

        try {
            const response = await apiInstance.post(url, req.body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log('response en middelware user permitions: ', response.status)
            if (response.status >= 200 && response.status < 300) {
                console.log('en if')
                if (req.body.role === role) {
                    console.log('todo ok')
                    next()
                } else {
                    console.log('else, no permisiions, no role')
                    errors = [{ msg: YOU_DO_NOT_HAVE_PERMISSIONS_TO_ACCESS_THIS_SECTION }]
                    return res.status(StatusCodes.FORBIDDEN).json({ errors })
                }
            } else {
                console.log('en else')
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