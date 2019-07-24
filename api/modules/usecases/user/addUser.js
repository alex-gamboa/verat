const assetRepo = require('../../db/assetRepo')
const bcrypt = require('bcrypt')

async function execute(user){

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password,salt)

    user.password = hash

    let result = await assetRepo.insertUser(user)

    return result
}

module.exports.execute = execute;
