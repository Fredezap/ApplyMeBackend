import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'
import { taskConstants } from '../../../constants/tasks/taskConstants.js'

const { INVALID_DESCRIPTION, DESCRIPTION_TOO_SHORT, DESCRIPTION_TOO_LONG } = errorCodes.tasksErrors
const { MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH } = taskConstants

const validateDescription = check('description', INVALID_DESCRIPTION).exists()
    .isString().isLength({ min: MIN_DESCRIPTION_LENGTH }).withMessage(DESCRIPTION_TOO_SHORT)
    .isString().isLength({ max: MAX_DESCRIPTION_LENGTH }).withMessage(DESCRIPTION_TOO_LONG)

export default validateDescription