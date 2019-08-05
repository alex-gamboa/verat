const repo = require('../../db/reportRepo')

async function execute(){

    let result = await repo.getAssetsByKind()

    return result
}

module.exports.execute = execute;
