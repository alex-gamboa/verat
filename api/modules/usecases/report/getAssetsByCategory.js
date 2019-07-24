const repo = require('../../db/reportRepo')

async function execute(){

    let result = await repo.getAssetsByCategory()

    return result
}

module.exports.execute = execute;
