const assetRepo = require('../../db/assetRepo')

async function execute(controlNumber){

    let result

    if(controlNumber)
        result = await assetRepo.getAsset(controlNumber)
    else
        result = await assetRepo.getAssets()

    return result
}

module.exports.execute = execute;
