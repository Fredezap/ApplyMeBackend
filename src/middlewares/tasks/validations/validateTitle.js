import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'
import { taskConstants } from '../../../constants/tasks/taskConstants.js'

const { INVALID_TITLE, TITLE_TOO_SHORT, TITLE_TOO_LONG } = errorCodes.tasksErrors
const { MIN_TITLE_LENGTH, MAX_TITLE_LENGTH } = taskConstants

const validateTitle = check('title', INVALID_TITLE).exists()
    .isString().isLength({ min: MIN_TITLE_LENGTH }).withMessage(TITLE_TOO_SHORT)
    .isString().isLength({ max: MAX_TITLE_LENGTH }).withMessage(TITLE_TOO_LONG)

export default validateTitle