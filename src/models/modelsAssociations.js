import { Image } from './imageModel.js'
import { Task } from './taskModel.js'
import { User } from './userModel.js'

export const modelsAssociations = () => {
    // Relación: Un usuario puede tener muchas tareas
    User.hasMany(Task, { foreignKey: 'userId' })
    Task.belongsTo(User, { foreignKey: 'userId' })

    // Relación: Una tarea puede tener muchas imágenes
    Task.hasMany(Image, { foreignKey: 'taskId' })
    Image.belongsTo(Task, { foreignKey: 'taskId' })
}