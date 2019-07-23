const repo = require('../../db/ticketRepo')

async function execute(part){

    let result

    result = await repo.insertSparePart(part)

    return result
}

module.exports.execute = execute;
