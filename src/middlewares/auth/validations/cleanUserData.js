export const cleanUserData = (req, res, next) => {
    console.log('DATOS RECIBIDOS: ', req.body)
    if (typeof req.body.user === 'string') {
        req.body.user = JSON.parse(req.body.user)
    }

    if (req.body.user && req.body.user.userId) {
        console.log('Limpio los datos')
        req.body = { ...req.body, ...req.body.user }
        delete req.body.user
        console.log('NUEVOS DATOS: ', req.body)
    }
    next()
}