const mongoose = require('mongoose')
const db = require('./db')


async function getTickets() {

    const result = await db.TicketModel.find({status: {$ne: 'Cerrado'}})

    return result
}

async function getTicketsForStatus(status) {

    const result = await db.TicketModel.find({status: {$eq: status}})

    return result
}

async function getTicketsForAgent(agent) {

    const result = await db.TicketModel.find().where('agent', agent)
    return result
}

async function getTicketsForPriority(priority) {

    const result = await db.TicketModel.find().where('priority', priority)
    return result
}

async function getTicketsForUser(user) {

    const result = await db.TicketModel.find().where('user', user)
    return result
}

async function getSpareParts(ticketId) {

    const result = await db.SparePartModel.find({ticket: {$eq: ticketId}})

    return result
}

async function getTicketPriorities() {

    const result = await db.TicketPriorityModel.find()

    return result
}

async function getTicketStates() {

    const result = await db.TicketStateModel.find()

    return result
}

async function getTicketServices() {

    const result = await db.TicketServiceModel.find()

    return result
}

async function getTicketTypes() {

    const result = await db.TicketTypeModel.find()

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

async function insertTicketPriority(priority) {

    let dbInstance = db.getTicketPriorityInstance(priority)

    const result =
        await dbInstance
            .validate()
            .then(_ => dbInstance.save())
            .catch(e => {
                console.log(e);
            })

    return result
}

async function insertTicketState(state) {

    let dbInstance = db.getTicketStateInstance(state)

    const result =
        await dbInstance
            .validate()
            .then(_ => dbInstance.save())
            .catch(e => {
                console.log(e);
            })

    return result
}

async function insertTicketType(type) {

    let dbInstance = db.getTicketTypeInstance(type)

    const result =
        await dbInstance
            .validate()
            .then(_ => dbInstance.save())
            .catch(e => {
                console.log(e);
            })

    return result
}

async function insertTicketService(service) {

    let dbInstance = db.getTicketServiceInstance(service)

    const result =
        await dbInstance
            .validate()
            .then(_ => dbInstance.save())
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
    getTickets,
    insertTicket,
    updateTicket,
    getSpareParts,
    insertSparePart,
    getTicketsForStatus,
    getTicketsForAgent,
    getTicketsForPriority,
    getTicketsForUser,
    getTicketPriorities,
    getTicketStates,
    getTicketServices,
    getTicketTypes,
    insertTicketPriority,
    insertTicketService,
    insertTicketState,
    insertTicketType
}
