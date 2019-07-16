const ticketRepo = require('../../db/ticketRepo')
const assetRepo = require('../../db/assetRepo')

async function execute(){

    let tickets;

    tickets = await ticketRepo.getTickets()

    for (let ticket of tickets) {
        await
            assetRepo
                .getUser(ticket.user)
                .then(user => {
                    ticket.userName = user[0].fullName
                })
    }

    return tickets
}

module.exports.execute = execute;
