import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { INVALID_TASK_ID } = errorCodes.tasksErrors

const validateTaskId = check('taskId', INVALID_TASK_ID).exists().isNumeric()

export default validateTaskId