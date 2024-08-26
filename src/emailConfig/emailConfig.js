import nodemailer from 'nodemailer'
import logger from '../utils/logger.js'
import { google } from 'googleapis'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const e = process.env
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const TOKEN_PATH = path.join(__dirname, 'token.json')
const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(
    e.GMAIL_API_CLIENT_ID,
    e.GMAIL_API_CLIENT_SECRET,
    e.GMAIL_API_REDIRECT_URL
)
const loadTokens = async() => {
    try {
        await fs.access(TOKEN_PATH)
        const data = await fs.readFile(TOKEN_PATH, 'utf8')
        const tokens = JSON.parse(data)
        oauth2Client.setCredentials(tokens)
        return tokens
    } catch (err) {
        logger.error('Error loading tokens from file:', err)
        return null
    }
}

const saveTokens = async(tokens) => {
    try {
        await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens), 'utf8')
        logger.info('Tokens saved to file')
    } catch (err) {
        logger.error('Error saving tokens to file:', err)
    }
}

const getValidAccessToken = async() => {
    const tokens = await loadTokens()
    if (!tokens) {
        logger.warn('No tokens found')
        throw new Error('No tokens available')
    }

    try {
        const { token } = await oauth2Client.getAccessToken()
        if (token) {
            return token
        } else {
            throw new Error('No access token available')
        }
    } catch (error) {
        logger.error('Error getting access token, attempting manual refresh:', error)
        try {
            const { tokens: newTokens } = await oauth2Client.refreshTokenNoCache(tokens.refresh_token)
            if (!newTokens) {
                throw new Error('Failed to refresh tokens')
            }
            oauth2Client.setCredentials(newTokens)
            await saveTokens(newTokens)
            return newTokens.access_token
        } catch (refreshError) {
            logger.error('Error refreshing access token manually:', refreshError)
            throw refreshError
        }
    }
}

let transporter

export const createTransporter = async() => {
    try {
        const accessToken = await getValidAccessToken()

        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: e.GMAIL_API_USER,
                clientId: e.GMAIL_API_CLIENT_ID,
                clientSecret: e.GMAIL_API_CLIENT_SECRET,
                refreshToken: oauth2Client.credentials.refresh_token,
                accessToken
            }
        })

        logger.info('Email transporter created successfully')
    } catch (error) {
        logger.error('Error while setting credentials in nodemailer transporter:', error)
        throw error
    }
}

export { transporter }