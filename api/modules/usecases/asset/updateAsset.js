const assetRepo = require('../../db/assetRepo')

async function execute(asset){

    const result = await assetRepo.updateAsset(asset)

    return result
}

module.exports.execute = execute;
