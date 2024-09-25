import { TaskApplied } from '../../../models/tasksAppliedModel.js'

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

const taskAppliedService = {
    create,
    updateTaskAppliedUser,
    findById
}

export default taskAppliedService