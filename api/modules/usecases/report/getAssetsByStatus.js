const repo = require('../../db/reportRepo')

async function execute(){

    let result = await repo.getAssetsByStatus()

    return result
}

module.exports.execute = execute;
