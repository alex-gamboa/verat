const mongoose = require('mongoose')
const db = require('./db')

async function insertTicket(ticket) {

    let ticketInstance = db.getTicketInstance(ticket)

    const result =
        await ticketInstance
            .validate()
            .then(_ => ticketInstance.save())

    return result
}

async function getTickets() {
    const result =
        await db.TicketModel.find()

    return result
}

module.exports.insertTicket = insertTicket
module.exports.getTickets = getTickets
