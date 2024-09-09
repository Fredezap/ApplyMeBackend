import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import validateTitle from '../middlewares/tasks/validations/validateTitle.js'
import validateDescription from '../middlewares/tasks/validations/validateDescription.js'
import checkImage from '../services/tasks/checkImage.js'
import { checkUserPermissions } from '../middlewares/auth/OAuth/checkUserPermissions.js'
import { createTask } from '../services/tasks/createTask.js'
import { getAllPendingTasks } from '../services/admin/getAllPendingTasks.js'

const taskRouter = express.Router()

const createTaskValidations = runValidations([
    validateTitle,
    validateDescription
])

const print = (req, res, next) => {
    console.log('en print')
    console.log(req.body)
    next()
}

taskRouter.post('/create',
    checkUserPermissions({ role: 'user' }),
    createTaskValidations,
    checkImage,
    createTask
)

taskRouter.post('/get-pending-tasks',
    print,
    checkUserPermissions({ role: 'employee' }),
    getAllPendingTasks
)

export default taskRouter