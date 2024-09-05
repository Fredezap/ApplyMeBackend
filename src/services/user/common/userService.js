import { Image } from '../../../models/imageModel.js'
import { Task } from '../../../models/taskModel.js'
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
                        }
                    ],
                    order: [['createdAt', 'DESC']]
                }
            ]
        })
        console.log('USER', user)
        return user
    } catch (error) {
        console.error('Error fetching user by email:', error)
        throw new Error()
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
                        }
                    ],
                    order: [['createdAt', 'DESC']]
                }
            ]
        })
        console.log('USER', user)
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

const userService = {
    registerUser,
    filterUserData,
    findByEmail,
    findByUserId,
    updateUser
}

export default userService