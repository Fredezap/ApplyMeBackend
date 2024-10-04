import { Image } from '../../../models/imageModel.js'
import { Task } from '../../../models/taskModel.js'
import { TaskApplied } from '../../../models/tasksAppliedModel.js'
import { User } from '../../../models/userModel.js'

const registerUser = async(user) => {
    const response = await User.create(user)
    return response
}

const filterUserData = (user) => {
    const userCopy = { ...user.dataValues }
    delete userCopy.password
    delete userCopy.createdAt
    delete userCopy.updatedAt
    delete userCopy.verificationToken
    return userCopy
}

const findByEmail = async(email) => {
    try {
        const user = await User.findOne({
            where: { email },
            include: [
                {
                    model: Task,
                    include: [
                        {
                            model: Image
                        },
                        {
                            model: TaskApplied,
                            required: false,
                            include: [
                                {
                                    model: User,
                                    attributes: ['name', 'surname', 'email', 'role', 'phone']
                                }
                            ]
                        }
                    ],
                    order: [['createdAt', 'DESC']]
                },
                {
                    model: TaskApplied,
                    include: [
                        {
                            model: Task,
                            include: [
                                {
                                    model: Image
                                },
                                {
                                    model: User,
                                    attributes: ['name', 'surname', 'email', 'role', 'phone']
                                }
                            ]
                        }
                    ],
                    order: [['createdAt', 'DESC']]
                }
            ]
        })

        console.log('Resultado de la consulta: ', JSON.stringify(user, null, 2))
        return user
    } catch (error) {
        console.error('Error fetching user by id:', error)
        throw new Error('Error fetching user data')
    }
}

const findByUserId = async(userId) => {
    try {
        const user = await User.findOne({
            where: { userId },
            include: [
                {
                    model: Task,
                    include: [
                        {
                            model: Image
                        },
                        {
                            model: TaskApplied,
                            required: false,
                            include: [
                                {
                                    model: User,
                                    attributes: ['name', 'surname', 'email', 'role', 'phone']
                                }
                            ]
                        }
                    ],
                    order: [['createdAt', 'DESC']]
                },
                {
                    model: TaskApplied,
                    include: [
                        {
                            model: Task,
                            include: [
                                {
                                    model: Image
                                },
                                {
                                    model: User,
                                    attributes: ['name', 'surname', 'email', 'role', 'phone']
                                }
                            ]
                        }
                    ],
                    order: [['createdAt', 'DESC']]
                }
            ]
        })

        console.log('Resultado de la consulta: ', JSON.stringify(user, null, 2))
        return user
    } catch (error) {
        console.error('Error fetching user by id:', error)
        throw new Error('Error fetching user data')
    }
}

const updateUser = async(values, userId) => {
    try {
        const [updatedRowsCount, [updatedUser]] = await User.update(values, {
            where: { userId },
            returning: true
        })
        return updatedUser
    } catch (error) {
        throw new Error()
    }
}

const getAll = async() => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password', 'token', 'verificationToken', 'createdAt', 'updatedAt'] }
        })
        return users
    } catch (error) {
        console.error('Error fetching all users:', error)
        throw new Error()
    }
}

const getAllEmployeeUsers = async() => {
    try {
        const users = await User.findAll({
            where: { role: 'employee' },
            attributes: { exclude: ['password', 'token', 'verificationToken', 'createdAt', 'updatedAt'] }
        })
        return users
    } catch (error) {
        console.error('Error fetching employee users:', error)
        throw new Error()
    }
}

const getAllCommonUsers = async() => {
    try {
        const users = await User.findAll({
            where: { role: 'user' },
            attributes: { exclude: ['password', 'token', 'verificationToken', 'createdAt', 'updatedAt'] }
        })
        return users
    } catch (error) {
        console.error('Error fetching common users:', error)
        throw new Error()
    }
}

const userService = {
    registerUser,
    filterUserData,
    findByEmail,
    findByUserId,
    updateUser,
    getAll,
    getAllCommonUsers,
    getAllEmployeeUsers
}

export default userService