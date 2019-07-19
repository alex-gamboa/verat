const assetRepo = require('../../db/assetRepo')

async function execute(user){

    let result = await assetRepo.insertUser(user);

    return result
}

module.exports.execute = execute;
