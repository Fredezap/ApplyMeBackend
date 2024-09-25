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
    // todo: Hacer que me traiga los datos de las tasks, no se si aca o en donde
    try {
        const user = await User.findOne({
            where: { email },
            include: [
                {
                    model: Task,
                    include: [
                        {
                            model: Image
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
        return user
    } catch (error) {
        console.error('Error fetching user by email:', error)
        throw new Error()
    }
}

const findByUserId = async(userId) => {
    // todo: Hacer que me traiga los datos de las tasks, no se si aca o en donde
    try {
        const user = await User.findOne({
            where: { userId },
            include: [
                {
                    model: Task,
                    include: [
                        {
                            model: Image
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
        return user
    } catch (error) {
        console.error('Error fetching user by id:', error)
        throw new Error()
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
        console.error('Error fetching user by id:', error)
        throw new Error()
    }
}

const userService = {
    registerUser,
    filterUserData,
    findByEmail,
    findByUserId,
    updateUser,
    getAll
}

export default userService