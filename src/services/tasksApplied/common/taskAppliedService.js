import { Sequelize } from 'sequelize'
import { Task } from '../../../models/taskModel.js'
import { TaskApplied } from '../../../models/tasksAppliedModel.js'
import { User } from '../../../models/userModel.js'

const create = async(values) => {
    const response = await TaskApplied.create(values)
    return response
}

const updateTaskAppliedUser = async(values, taskAppliedId) => {
    console.log(values, taskAppliedId)
    try {
        const [updatedRowsCount, [updatedTaskApplied]] = await TaskApplied.update(values, {
            where: { taskAppliedId },
            returning: true
        })
        console.log(updatedTaskApplied)
        return updatedTaskApplied
    } catch (error) {
        console.log(error)
        throw new Error('Error al actualizar task applied')
    }
}

const findById = async(taskAppliedId) => await TaskApplied.findOne({ where: { taskAppliedId } })

const getAllTaskAppliedByEmployees = async() => {
    const tasksApplied = await User.findAll({
        where: { role: 'employee' },
        attributes: ['userId', 'name', 'surname', 'email', 'phone'],
        include: [
            {
                model: TaskApplied,
                include: [
                    {
                        model: Task,
                        attributes: ['taskId', 'title', 'description', 'stillExist', 'userId'],
                        include: [
                            {
                                model: User,
                                attributes: ['userId', 'name', 'surname', 'email', 'phone']
                            }
                        ]
                    }
                ]
            }
        ],
        order: [[{ model: TaskApplied }, 'status', 'ASC']]
    })

    return tasksApplied
}

const taskAppliedService = {
    create,
    updateTaskAppliedUser,
    findById,
    getAllTaskAppliedByEmployees
}

export default taskAppliedService