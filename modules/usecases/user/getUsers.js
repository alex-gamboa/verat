const assetRepo = require('../../db/assetRepo')

async function execute(){

    let result = await assetRepo.getUsers()

    return result
}

module.exports.execute = execute;
