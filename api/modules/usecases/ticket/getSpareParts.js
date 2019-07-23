const repo = require('../../db/ticketRepo')

async function execute(ticketId){

    let result = await repo.getSpareParts(ticketId)

    return result
}

module.exports.execute = execute;
