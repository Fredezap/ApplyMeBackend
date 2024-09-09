import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import taskService from '../tasks/common/taskService.js'
const { ERROR_WHILE_GETTING_PENDING_TASKS } = errorCodes.adminErrors

export const getAllPendingTasks = async(req, res) => {
    try {
        const tasks = await taskService.findAllPendingTasks()
        return res.status(StatusCodes.OK).json({ tasks })
    } catch (err) {
        console.log(err)
        const errors = [{ msg: ERROR_WHILE_GETTING_PENDING_TASKS }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}