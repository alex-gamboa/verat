const ticketRepo = require('../../db/ticketRepo')

async function execute(ticket){

    const result = await ticketRepo.updateTicket(ticket)

    return result
}

module.exports.execute = execute;
