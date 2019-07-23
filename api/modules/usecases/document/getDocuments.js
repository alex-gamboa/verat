const repo = require('../../db/documentRepo')

async function execute(){

    let documents = await repo.getDocuments()

    return documents

}

module.exports.execute = execute;
