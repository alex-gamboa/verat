const assetRepo = require('../../db/assetRepo')

async function execute(){

    let result = await assetRepo.getAssetAreas()

    return result
}

module.exports.execute = execute;
