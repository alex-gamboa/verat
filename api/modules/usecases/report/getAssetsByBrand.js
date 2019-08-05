const repo = require('../../db/reportRepo')

async function execute(){

    let result = await repo.getAssetsByBrand()

    return result
}

module.exports.execute = execute;
