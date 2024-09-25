import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'
import taskService from '../../../services/tasks/common/taskService.js'

const { TASK_DO_NOT_EXIST } = errorCodes.tasksErrors

const validateTasksExistsById = check('taskId', TASK_DO_NOT_EXIST).custom(
    async(taskId, { req }) => {
        const task = await taskService.findById(taskId)

        if (task) {
            return Promise.resolve()
        }

        return Promise.reject(new Error(TASK_DO_NOT_EXIST))
    }
)

export default validateTasksExistsById