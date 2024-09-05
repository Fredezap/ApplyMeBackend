import { commonConstants } from '../../../constants/common/commonConstants.js'
const { IMAGE_ALLOWED_MIME_TIPES } = commonConstants

export const isImage = (value) => {
    return IMAGE_ALLOWED_MIME_TIPES.includes(value.mimetype)
}