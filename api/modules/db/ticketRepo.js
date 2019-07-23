const mongoose = require('mongoose')
const db = require('./db')


async function getTickets() {

    const result = await db.TicketModel.find({status: {$ne: 'Cerrado'}})

    return result
}

async function getSpareParts(ticketId) {

    const result = await db.SparePartModel.find({ticket: {$eq: ticketId}})

    return result
}

async function insertTicket(ticket) {

    let dbTicket = db.getTicketInstance(ticket)

    const result =
        await dbTicket
            .validate()
            .then(_ => dbTicket.save())
            .catch(e => {
                console.log(e);
            })

    return result
}

async function insertSparePart(part) {

    let dbPart = db.getSparePartInstance(part)

    const result =
        await dbPart
            .validate()
            .then(_ => dbPart.save())
            .catch(e => {
                console.log(e);
            })

    return result
}

async function updateTicket(ticket) {

    const result =
        await db.TicketModel
            .updateOne({ _id: ticket._id }, ticket)

    return result
}

module.exports = {
    getTickets: getTickets,
    insertTicket: insertTicket,
    updateTicket: updateTicket,
    getSpareParts: getSpareParts,
    insertSparePart: insertSparePart
}
