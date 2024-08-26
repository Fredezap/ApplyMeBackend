const normalizeEmail = (req, res, next) => {
    req.body.email = req.body.email.toLowerCase()
    next()
}

export default normalizeEmail