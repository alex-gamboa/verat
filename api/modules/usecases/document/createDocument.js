const repo = require('../../db/documentRepo')

async function execute(document){

    let result

    result = await repo.insertDocument(document)

    return result
}

module.exports.execute = execute;
