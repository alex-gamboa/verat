const assetRepo = require('../../db/assetRepo')

async function execute(controlNumber){

    const result = await assetRepo.getAsset(controlNumber)

    return result
}

module.exports.execute = execute;
