import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'
import { User } from './userModel.js'
import { tasksAppliedConstants } from '../constants/tasksApplied/tasksAppliedConstants.js'
import { Task } from './taskModel.js'

const { STATUS } = tasksAppliedConstants

export const TaskApplied = sequelize.define('TaskApplied', {
    taskAppliedId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(STATUS.COMPLETED, STATUS.CANCELED, STATUS.IN_PROGRES),
        allowNull: false,
        defaultValue: STATUS.IN_PROGRES
    },
    comments: {
        type: DataTypes.TEXT,
        allowNull: true
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
    },
    taskId: {
        type: DataTypes.INTEGER,
        references: {
            model: Task,
            key: 'taskId'
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
})

await sequelize.sync({ alter: true })
    .then(() => {
        logger.info('TaskApplied synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing TaskApplied:', err)
    })