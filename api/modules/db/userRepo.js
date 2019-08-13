const db = require('./db')

async function getUsers() {

    const result = await db.UserModel.find()

    return result
}

async function getAgents() {

    const result = await db.UserModel.find({type: 'Soporte'})

    return result
}

async function getUserByUsername(username) {

    const result = await db.UserModel.findOne({username: username})

    return result
}

async function getUserDocuments(userId) {

    const result = await db.UserDocumentModel.find({user: {$eq: userId}})

    return result
}

async function insertDocument(document) {

    let dbDocument = db.getUserDocumentInstance(document)

    const result =
        await dbDocument
            .validate()
            .then(_ => dbDocument.save())
            .catch(e => {
                console.log(e);
            })

    return result
}

async function updateUser(user) {

    const result =
        await db.UserModel
            .updateOne({ _id: user._id }, user)

    return result
}

module.exports = {
    getUsers,
    getUserDocuments,
    insertDocument,
    updateUser,
    getUserByUsername,
    getAgents
}
