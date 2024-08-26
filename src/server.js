import express from 'express'
import expressOasGenerator from 'express-oas-generator'
import logger from 'morgan'
import cors from 'cors'
import { router } from './router.js'
import { createTransporter } from './emailConfig/emailConfig.js'
import { models } from './models/modelsExportation.js'
import dotenv from 'dotenv'

// TODO: add setEnvVariables
const environment = process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''
dotenv.config({ path: `.env${environment}` })

const server = express()
server.use(logger(process.env.LOGGER_LEVEL))
server.use(cors())
server.use(express.json())
server.use('/api', router)

// Para analizar cuerpos JSON
server.use(express.json({ limit: '10mb' }))

// Para analizar cuerpos URL-encoded
server.use(express.urlencoded({ limit: '10mb', extended: true }))

const PRODUCTION = 'production'
const sequelizeModels = models

expressOasGenerator.handleResponses(server, {
    specOutputPath: './api_docs.json',
    sequelizeModels,
    ignoredNodeEnvironments: [PRODUCTION],
    alwaysServeDocs: true
})
expressOasGenerator.handleRequests()

await createTransporter()

export default server