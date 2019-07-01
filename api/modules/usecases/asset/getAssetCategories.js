const assetRepo = require('../../db/assetRepo')

async function execute(){

    let result = await assetRepo.getCategories();

    return result
}

module.exports.execute = execute;
