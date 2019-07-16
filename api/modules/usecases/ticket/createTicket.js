const ticketRepo = require('../../db/ticketRepo')

async function execute(ticket){

    let result

    result = await ticketRepo.insertTicket(ticket)

    return result
}

module.exports.execute = execute;
