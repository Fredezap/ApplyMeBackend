import { StatusCodes } from 'http-status-codes'
import taskAppliedService from '../tasksApplied/common/taskAppliedService.js'
import errorCodes from '../../constants/errors/errorCodes.js'
const { AN_ERROR_OCURRED_WHILE_GETTING_ALL_TASKS_APPLIED } = errorCodes.tasksErrors

export const getAllTaskAppliedForAdmin = async(req, res) => {
    try {
        const allTasksApplied = await taskAppliedService.getAllTaskAppliedByEmployees()
        return res.status(StatusCodes.OK).json({ allTasksApplied })
    } catch (error) {
        console.log(error)
        const errors = [{ msg: AN_ERROR_OCURRED_WHILE_GETTING_ALL_TASKS_APPLIED }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}