import { StatusCodes } from 'http-status-codes'
import { sequelize } from '../../database/connection.js'
import imageService from '../images/common.js/imageService.js'
import taskService from './common/taskService.js'
import errorCodes from '../../constants/errors/errorCodes.js'
import userService from '../user/common/userService.js'
const { AN_ERROR_OCURRED_WHILE_CREATING_TASK } = errorCodes.tasksErrors

export const createTask = async(req, res) => {
    const transaction = await sequelize.transaction()

    try {
        const { title, description, userId } = req.body
        const image = req.file
        const taskValues = { title, description, userId }
        const task = await taskService.createWithTransaction(taskValues, { transaction })

        if (image) {
            const { name, url } = req.body.imageData
            const taskId = task.taskId
            const imageValues = { name, url, taskId }
            await imageService.createWithTransaction(imageValues, { transaction })
        }

        await transaction.commit()

        const user = await userService.findByUserId(userId)
        const filteredUser = userService.filterUserData(user)
        return res.status(StatusCodes.CREATED).json({ user: filteredUser })
    } catch (error) {
        await transaction.rollback()
        const errors = [{ msg: AN_ERROR_OCURRED_WHILE_CREATING_TASK }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}