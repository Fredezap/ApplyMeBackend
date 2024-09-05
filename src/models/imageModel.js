import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'
import { Task } from './taskModel.js'

export const Image = sequelize.define('Image', {
    imageId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
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
        logger.info('Image synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing Image:', err)
    })