export const cleanUserData = (req, res, next) => {
    if (typeof req.body.user === 'string') {
        req.body.user = JSON.parse(req.body.user)
    }

    if (req.body.user && req.body.user.userId) {
        req.body = { ...req.body, ...req.body.user }
        delete req.body.user
    }
    next()
}