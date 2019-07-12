const mongoose = require('mongoose')
const db = require('./db')


async function getConsumables() {

    const result = await db.ConsumableModel.find()

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

async function updateConsumable(consumable) {

    const result =
        await db.ConsumableModel
            .updateOne({ _id: consumable._id }, consumable)

    return result
}

module.exports = {
    getConsumables: getConsumables,
    insertConsumable: insertConsumable,
    updateConsumable: updateConsumable
}
