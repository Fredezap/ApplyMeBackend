import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'
import { v4 as uuidv4 } from 'uuid'
import { userConstants } from '../constants/user/userConstants.js'

const { MIN_PASSWORD_LENGTH, MIN_NAME_LENGTH, MIN_SURNAME_LENGTH, MAX_NAME_LENGTH, MAX_SURNAME_LENGTH, ROLES } = userConstants

export const User = sequelize.define('User', {
    userId: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [MIN_NAME_LENGTH, MAX_NAME_LENGTH]
        }
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [MIN_SURNAME_LENGTH, MAX_SURNAME_LENGTH]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    role: {
        type: DataTypes.ENUM(ROLES.ADMIN, ROLES.EMPLOYEE, ROLES.USER),
        allowNull: false,
        defaultValue: 'user'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [MIN_PASSWORD_LENGTH]
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    verificationToken: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

await sequelize.sync({ alter: true })
    .then(() => {
        logger.info('User synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing User:', err)
    })