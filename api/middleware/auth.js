const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = function (req, res, next) {
    const token = req.header('Authorization')

    if(!token) res.status(401).send('Acceso denegado. Debe proveer un token')

    try {
        const payload = jwt.verify(token, config.jwtPrivate)
        req.user = payload
        next()
    } catch (error) {
        res.status(400).send('Token Invalido')
    }
}
