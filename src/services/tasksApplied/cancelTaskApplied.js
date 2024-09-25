import errorCodes from '../../constants/errors/errorCodes.js'
import taskAppliedService from './common/taskAppliedService.js'
import userService from '../user/common/userService.js'
import { StatusCodes } from 'http-status-codes'
import { tasksAppliedConstants } from '../../constants/tasksApplied/tasksAppliedConstants.js'
const { STATUS } = tasksAppliedConstants

const { AN_ERROR_OCURRED_WHILE_UPDATING_TASK } = errorCodes.tasksErrors

export const cancelTaskApplied = async(req, res) => {
    try {
        const { taskAppliedId, userId } = req.body
        const values = { status: STATUS.CANCELED }
        const response = await taskAppliedService.updateTaskAppliedUser(values, taskAppliedId)
        console.log('response en task applied create', response)
        const user = await userService.findByUserId(userId)
        const filteredUser = userService.filterUserData(user)
        return res.status(StatusCodes.OK).json({ user: filteredUser })
    } catch (err) {
        console.error('ERROR EN CANCEL TAKS APLIED', err)
        const errors = [{ msg: AN_ERROR_OCURRED_WHILE_UPDATING_TASK }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}