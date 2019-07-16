const userRepo = require('../../db/userRepo')

async function execute(userId){

    let result = await userRepo.getUserDocuments(userId)

    return result
}

module.exports.execute = execute;
