import logger from '../../../utils/logger.js'

export const isImage = (value) => {
    const imageMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/tiff',
        'image/webp',
        'image/svg+xml',
        'image/x-icon',
        'image/heic',
        'image/avif'
    ]

    return imageMimeTypes.includes(value.mimetype)
}