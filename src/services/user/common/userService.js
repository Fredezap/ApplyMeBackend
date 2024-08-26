import { User } from '../../../models/userModel.js'

const registerUser = async(user) => {
    const response = await User.create(user)
    return response
}

const filterUserData = (user) => {
    const userCopy = { ...user.dataValues }
    const filteredUser = {
        userId: userCopy.userId,
        name: userCopy.name,
        surname: userCopy.surname,
        email: userCopy.email,
        role: userCopy.role,
        phone: userCopy.phone,
        token: userCopy.token
    }
    return filteredUser
}

const findByEmail = async(email) => await User.findOne({ where: { email } })

const findByUserId = async(userId) => await User.findOne({ where: { userId } })

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