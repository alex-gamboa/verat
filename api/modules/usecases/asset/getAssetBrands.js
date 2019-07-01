const assetRepo = require('../../db/assetRepo')

async function execute(){

    let result = await assetRepo.getAssetBrands()

    return result
}

module.exports.execute = execute;
