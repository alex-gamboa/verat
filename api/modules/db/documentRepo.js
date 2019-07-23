const db = require('./db')


async function getDocuments() {

    const result = await db.DocumentModel.find()

    return result
}

async function insertDocument(document) {

    let dbDocument = db.getDocumentInstance(document)

    const result =
        await dbDocument
            .validate()
            .then(_ => dbDocument.save())
            .catch(e => {
                console.log(e);
            })

    return result
}

async function updateDocument(document) {

    const result =
        await db.DocumentModel
            .updateOne({ _id: document._id }, document)

    return result
}

module.exports = {
    getDocuments: getDocuments,
    insertDocument: insertDocument,
    updateDocument: updateDocument
}
