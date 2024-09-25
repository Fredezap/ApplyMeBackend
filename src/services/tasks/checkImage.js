import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import { isImage } from '../../middlewares/common/validations/isImage.js'
import { taskConstants } from '../../constants/tasks/taskConstants.js'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const { IMAGE_TOO_BIG, MAXIMUM_SIZE_ALLOWED_5_MB, INVALID_IMAGE_FORMAT, INVALID_IMAGE } = errorCodes.imageErrors
const { INTERNAL_SERVER_ERROR } = errorCodes.commonErrors
const { IMAGE_MAX_SIZE } = taskConstants
const { ERROR_LOADING_THE_IMAGE } = errorCodes.imageErrors
let errors

const checkImage = (req, res, next) => {
    try {
        const file = req.file
        let checkIfExist
        let checkSize

        if (!file) return next()

        if (file.fieldname === 'image' && file.mimetype && file.size) {
            checkIfExist = isImage(file)
            checkSize = file.size < IMAGE_MAX_SIZE
        } else {
            errors = [{ msg: INVALID_IMAGE }]
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
        }

        if (!checkIfExist) {
            errors = [{ msg: INVALID_IMAGE_FORMAT }]
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
        }

        if (!checkSize) {
            errors = [{ msg: IMAGE_TOO_BIG }, { msg: MAXIMUM_SIZE_ALLOWED_5_MB }]
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
        }

        const rootEnv = process.env.PROJECT_ROOT

        const __filename = fileURLToPath(import.meta.url)
        const __dirname = path.dirname(__filename)
        const projectRoot = path.resolve(__dirname, rootEnv)
        const filePath = file.path
        const filePathJoin = path.join(projectRoot, filePath)

        if (!fs.existsSync(filePathJoin)) {
            const errors = [{ msg: ERROR_LOADING_THE_IMAGE }]
            return res.status(StatusCodes.NOT_FOUND).json({ errors })
        }

        req.body.imageData = { url: `http://localhost:3001/api/${filePath}`, name: file.originalname || file.fieldname }

        return next()
    } catch (error) {
        console.log('error en check image: ', error)
        errors = [{ msg: INTERNAL_SERVER_ERROR }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}

export default checkImage