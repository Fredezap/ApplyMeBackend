import { Image } from '../../../models/imageModel.js'
import { Task } from '../../../models/taskModel.js'

const create = async(task) => {
    const response = await Task.create(task)
    return response
}

const createWithTransaction = async(task, { transaction }) => {
    const response = await Task.create(task, { transaction })
    return response
}

const findById = async(taskId) => await Task.findOne({ where: { taskId } })

const update = async(values, taskId) => {
    try {
        const [updatedRowsCount, [updatedTask]] = await Task.update(values, {
            where: { taskId },
            returning: true
        })
        return updatedTask
    } catch (error) {
        throw new Error()
    }
}

const getUserTasks = async(userId) => {
    try {
        const userTasks = await Task.findAll({
            where: {
                userId
            },
            include: [{
                model: Image
            }]
        })
        return userTasks
    } catch (error) {
        console.error('Error fetching user tasks:', error)
        throw new Error()
    }
}

const taskService = {
    create,
    createWithTransaction,
    findById,
    update
}

export default taskService