const assetRepo = require('../../db/assetRepo')

async function execute(controlNumber){

    let dbAsset = await assetRepo.getAsset(controlNumber)
    dbAsset[0].lastCount = new Date()

    const result = await assetRepo.updateAsset(dbAsset[0])

    return result
}

module.exports.execute = execute;
