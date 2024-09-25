import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import taskAppliedService from './common/taskAppliedService.js'
import userService from '../user/common/userService.js'

const { AN_ERROR_OCURRED_WHILE_APPLYING_FOR_A_TASK } = errorCodes.tasksErrors

export const createTaskApplied = async(req, res) => {
    try {
        const { taskId, userId } = req.body
        const values = { taskId, userId }
        const response = await taskAppliedService.create(values)
        console.log('response en task applied create', response)
        const user = await userService.findByUserId(userId)
        const filteredUser = userService.filterUserData(user)
        return res.status(StatusCodes.CREATED).json({ user: filteredUser })
    } catch (err) {
        console.error('ERROR EN CREATE TAKS APLIED', err)
        const errors = [{ msg: AN_ERROR_OCURRED_WHILE_APPLYING_FOR_A_TASK }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}