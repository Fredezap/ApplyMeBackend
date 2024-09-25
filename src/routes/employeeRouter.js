import express from 'express'
import { getAllPendingTasks } from '../services/admin/getAllPendingTasks.js'
import { checkUserPermissions } from '../middlewares/auth/OAuth/checkUserPermissions.js'
import validateTasksExistsById from '../middlewares/tasks/validations/validateTasksExistsById.js'
import runValidations from '../middlewares/common/validations/runValidations.js'
import validateTaskId from '../middlewares/tasks/validations/validateTaskId.js'
import { createTaskApplied } from '../services/tasksApplied/createTaskApplied.js'
import { cancelTaskApplied } from '../services/tasksApplied/cancelTaskApplied.js'
import { completeTaskApplied } from '../services/tasksApplied/completeTaskApplied.js'
import validateTaskAppliedId from '../middlewares/taskApplied/validations/validateTaskAppliedId.js'
import validateTaskAppliedExistsById from '../middlewares/taskApplied/validations/validateTaskAppliedExistsById.js'

const employeeRouter = express.Router()

employeeRouter.use(checkUserPermissions({ role: 'employee' }))

const taskValidations = runValidations([
    validateTaskId,
    validateTasksExistsById
])

const taskAppliedValidations = runValidations([
    validateTaskAppliedId,
    validateTaskAppliedExistsById
])

const print = (req, res, next) => {
    console.log('en print')
    console.log(req.body)
    next()
}

employeeRouter.post('/get-pending-tasks',
    getAllPendingTasks
)

employeeRouter.post('/apply-for-a-task',
    print,
    taskValidations,
    createTaskApplied
)

employeeRouter.post('/unapply-task',
    print,
    taskAppliedValidations,
    cancelTaskApplied
)

employeeRouter.post('/complete-task',
    print,
    taskAppliedValidations,
    completeTaskApplied
)

export default employeeRouter