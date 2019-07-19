const userRepo = require('../../db/userRepo')

async function execute(document){

    let result = await userRepo
        .insertDocument(document);

    return result
}

module.exports.execute = execute;
