const userRepo = require('../../db/userRepo')

async function execute(user){

    const result = await userRepo.updateUser(user)

    return result
}

module.exports.execute = execute;
