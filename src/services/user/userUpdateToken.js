import { StatusCodes } from 'http-status-codes'
import userService from './common/userService.js'
import userErrorCodes from '../../constants/errors/errorCodes.js'
import taskService from '../tasks/common/taskService.js'

const { SERVER_ERROR_OCCURRED } = userErrorCodes.commonErrors

export const userUpdateToken = async(req, res) => {
    try {
        const { user, token } = req.body
        const userId = user.userId
        // todo: CHEQUEAR TODO ESTO. QUIZA LO HAGA SEPARADO, AL MENOS LO DEL ADMIN.
        // todo: quiza cambiar el nombre de esta funcion o crear una final que sea LOGIN
        console.log('USER ANTES DEL UPDATE: ', user)
        await userService.updateUser({ token }, userId)
        user.token = token
        const filteredUser = userService.filterUserData(user)
        if (filteredUser.role === 'employee') {
            console.log('EN EMPLOYEE')
            const unappliedTasks = await taskService.findAllPendingTasks()
            console.log(unappliedTasks.length)
            return res.status(StatusCodes.OK).json({ user: filteredUser, unappliedTasks })
        } else {
            return res.status(StatusCodes.OK).json({ user: filteredUser })
        }
    } catch (error) {
        const errors = [{ msg: SERVER_ERROR_OCCURRED }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}