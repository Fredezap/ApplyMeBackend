import { Image } from './imageModel.js'
import { Task } from './taskModel.js'
import { User } from './userModel.js'
import { TaskApplied } from './tasksAppliedModel.js'

export const modelsAssociations = () => {
    // Relación: Un usuario puede tener muchas tareas
    User.hasMany(Task, { foreignKey: 'userId' })
    Task.belongsTo(User, { foreignKey: 'userId' })

    // Relación: Una tarea puede tener muchas imágenes
    Task.hasMany(Image, { foreignKey: 'taskId' })
    Image.belongsTo(Task, { foreignKey: 'taskId' })

    // Relación: Una tarea puede tener muchas aplicaciones
    Task.hasMany(TaskApplied, { foreignKey: 'taskId' })
    TaskApplied.belongsTo(Task, { foreignKey: 'taskId' })

    // Relación: Un usuario puede tener muchas aplicaciones
    User.hasMany(TaskApplied, { foreignKey: 'userId' })
    TaskApplied.belongsTo(User, { foreignKey: 'userId' })
}