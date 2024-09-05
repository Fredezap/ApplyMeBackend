import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'
import { taskConstants } from '../constants/tasks/taskConstants.js'
import { User } from './userModel.js'
import { Image } from './imageModel.js'

const { MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH } = taskConstants

export const Task = sequelize.define('Task', {
    taskId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [MIN_TITLE_LENGTH, MAX_TITLE_LENGTH]
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH]
        }
    },
    stillExist: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'userId'
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
})

await sequelize.sync({ alter: true })
    .then(() => {
        logger.info('Task synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing Task:', err)
    })