const moment = require('moment')
const assetRepo = require('../../db/assetRepo')

async function execute(assetId){

    let result = await assetRepo.getLogs(assetId)

    return result
}

module.exports.execute = execute;
