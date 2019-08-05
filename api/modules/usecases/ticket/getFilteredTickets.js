const repo = require('../../db/ticketRepo')

async function execute(filter){

    let tickets

    if (filter.type === 'Estado')
        tickets = await repo.getTicketsForStatus(filter.value)
    else if(filter.type === 'Agente')
        tickets = await repo.getTicketsForAgent(filter.value)
    else if(filter.type === 'Prioridad')
        tickets = await repo.getTicketsForPriority(filter.value)
    else if(filter.type === 'Usuario')
        tickets = await repo.getTicketsForUser(filter.value)



    return tickets
}

module.exports.execute = execute;
