const userRepo = require('../../db/userRepo')
const bcrypt = require('bcrypt')

async function execute(user){

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password,salt)

    user.password = hash

    const result = await userRepo.updateUser(user)

    return result
}

module.exports.execute = execute;
