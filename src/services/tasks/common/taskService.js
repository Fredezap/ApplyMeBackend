import { Sequelize } from 'sequelize'
import { Image } from '../../../models/imageModel.js'
import { Task } from '../../../models/taskModel.js'
import { tasksAppliedConstants } from '../../../constants/tasksApplied/tasksAppliedConstants.js'
import { TaskApplied } from '../../../models/tasksAppliedModel.js'
import { User } from '../../../models/userModel.js'
const { STATUS } = tasksAppliedConstants

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

const findAllPendingTasks = async() => {
    try {
        const tasks = await Task.findAll({
            include: [
                {
                    model: Image
                },
                {
                    model: User,
                    attributes: ['userId', 'name', 'surname', 'email', 'phone']
                }
            ],
            where: {
                // Esta subconsulta asegura que no existan TaskApplied con esos estados para la tarea
                [Sequelize.Op.and]: [
                    Sequelize.literal(`
                        NOT EXISTS (
                            SELECT 1 FROM "TaskApplieds"
                            WHERE "TaskApplieds"."taskId" = "Task"."taskId"
                            AND "TaskApplieds"."status" IN ('${STATUS.IN_PROGRES}', '${STATUS.COMPLETED}')
                        )
                    `)
                ]
            }
        })
        console.log('tasks.length', tasks.length)
        return tasks
    } catch (error) {
        console.error('Error fetching tasks:', error)
        throw new Error('Error fetching tasks')
    }
}

const taskService = {
    create,
    createWithTransaction,
    findById,
    update,
    getUserTasks,
    findAllPendingTasks
}

export default taskService