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

async function insertAsset(asset) {
    let assetInstance = db.getAssetInstance(asset)

    const result =
        await assetInstance
            .validate()
            .then(_ => assetInstance.save())

    return result
}

async function insertAssetCategory(category) {
    let categoryInstance = db.getAssetCategoryInstance(category)

    const result =
        await categoryInstance
            .validate()
            .then(_ => categoryInstance.save())

    return result
}

module.exports.insertTicket = insertTicket
module.exports.getTickets = getTickets

module.exports.insertAsset = insertAsset
module.exports.insertAssetCategory = insertAssetCategory
