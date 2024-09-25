import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { INVALID_TASK_APPLIED_ID } = errorCodes.tasksErrors

const validateTaskAppliedId = check('taskAppliedId', INVALID_TASK_APPLIED_ID).exists().isNumeric()

export default validateTaskAppliedId