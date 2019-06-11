const assetRepo = require('../../db/assetRepo')

async function execute(controlNumber){

    let result = await assetRepo.getLogs(controlNumber)

    console.log(result);


    return result
}

module.exports.execute = execute;
