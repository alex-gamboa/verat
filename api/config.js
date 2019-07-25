module.exports = {
    mongoHost: process.env.MONGO_HOST,
    mongoPort: process.env.MONGO_PORT,
    mongoDBName: process.env.DB_NAME,
    nodePublicPath: process.env.NODE_PUBLIC,
    dev: process.env.DEVELOPMENT,
    jwtPrivate: process.env.JWT_PRIVATE
}
