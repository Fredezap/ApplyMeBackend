import { Image } from '../../../models/imageModel.js'

const create = async(image) => {
    const response = await Image.create(image)
    return response
}

const createWithTransaction = async(image, { transaction }) => {
    const response = await Image.create(image, { transaction })
    return response
}

const findById = async(imageId) => await Image.findOne({ where: { imageId } })

// todo: cheuqear este update ya que hay que cambiar en realidad la url y el nombre de la imagen en db
// const update = async(values, imageId) => {
//     try {
//         const [updatedRowsCount, [updatedTask]] = await Image.update(values, {
//             where: { imageId },
//             returning: true
//         })
//         return updatedTask
//     } catch (error) {
//         throw new Error()
//     }
// }

const imageService = {
    create,
    createWithTransaction,
    findById
    // update
}

export default imageService