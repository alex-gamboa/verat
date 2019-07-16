const db = require('./db')


async function getConsumables() {

    const result = await db.ConsumableModel.find()

    return result
}

async function getConsumableModels() {

    const result = await db.ConsumableModel.find().select('model -_id')

    return result
}

async function insertConsumable(consumable) {

    let dbConsumable = db.getConsumableInstance(consumable)

    const result =
        await dbConsumable
            .validate()
            .then(_ => dbConsumable.save())
            .catch(e => {
                console.log(e);
            })

    return result
}

async function insertConsumableHistory(history) {

    let dbHistory = db.getConsumableHistoryInstance(history)

    const result =
        await dbHistory
            .validate()
            .then(_ => dbHistory.save())
            .catch(e => {
                console.log(e);
            })

    return result
}

async function updateConsumable(consumable) {

    const result =
        await db.ConsumableModel
            .updateOne({ _id: consumable._id }, consumable)

    return result
}

module.exports = {
    getConsumables: getConsumables,
    insertConsumable: insertConsumable,
    updateConsumable: updateConsumable,
    getConsumableModels: getConsumableModels,
    insertConsumableHistory: insertConsumableHistory
}
