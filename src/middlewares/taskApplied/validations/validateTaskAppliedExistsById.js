import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'
import taskAppliedService from '../../../services/tasksApplied/common/taskAppliedService.js'

const { TASK_APPLIED_DO_NOT_EXIST } = errorCodes.tasksErrors

const validateTaskAppliedExistsById = check('taskAppliedId', TASK_APPLIED_DO_NOT_EXIST).custom(
    async(taskAppliedId, { req }) => {
        const task = await taskAppliedService.findById(taskAppliedId)

        if (task) {
            return Promise.resolve()
        }

        return Promise.reject(new Error(TASK_APPLIED_DO_NOT_EXIST))
    }
)

export default validateTaskAppliedExistsById