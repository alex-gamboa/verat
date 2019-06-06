const assetRepo = require('../../db/assetRepo')

async function execute(userName){

    const user = {
        fullName: userName
    }
    let result = await assetRepo
        .insertUser(user);

    return result
}

module.exports.execute = execute;
