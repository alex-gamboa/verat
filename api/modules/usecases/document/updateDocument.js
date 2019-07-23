const repo = require('../../db/documentRepo')

async function execute(document){

    const result = await repo.updateDocument(document)

    return result
}

module.exports.execute = execute;
