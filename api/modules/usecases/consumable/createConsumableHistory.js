const consumableRepo = require('../../db/consumableRepo')

async function execute(history){

    let result

    result = await consumableRepo.insertConsumableHistory(history)

    let result2 = await consumableRepo.getConsumable(history.consumable)

    let consumable = result2[0]

    if(consumable) {
        consumable.quantity -= 1

        result2 = consumableRepo.updateConsumable(consumable)
    }

    return result
}

module.exports.execute = execute;
