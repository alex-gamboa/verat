const mongoose = require('mongoose')
const db = require('./db')

async function insertTicket(ticket) {
    const model = new db.Ticket(ticket)

    const result =
        await
            model
                .validate()
                .then(_ => model.save())

    return result
}

module.exports.insertTicket = insertTicket;
