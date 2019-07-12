const consumableRepo = require('../../db/consumableRepo')

async function execute(consumable){

    let result

    result = await consumableRepo.insertConsumable(consumable)

    return result
}

module.exports.execute = execute;
