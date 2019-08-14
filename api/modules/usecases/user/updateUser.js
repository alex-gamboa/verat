const userRepo = require('../../db/userRepo')
const bcrypt = require('bcrypt')

async function execute(user){

    if (user.password) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password,salt)

        user.password = hash
    }
    else {
        const dbUser = await userRepo.getUserByUsername(user.username)
        user.password = dbUser.password
    }

    const result = await userRepo.updateUser(user)

    return result
}

module.exports.execute = execute;
