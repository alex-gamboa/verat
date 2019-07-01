const assetRepo = require('../../db/assetRepo')

async function execute(controlNumber){

    let dbAsset = await assetRepo.getAsset(controlNumber)
    dbAsset[0].astCount = new Date()
    // dbAsset[0].lastCount = new Date(((new Date()).getTime()) - ((new Date()).getTimezoneOffset() * 60000))

    const result = await assetRepo.updateAsset(dbAsset[0])

    return result
}

module.exports.execute = execute;
