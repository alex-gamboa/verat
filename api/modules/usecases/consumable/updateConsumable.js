const consumableRepo = require('../../db/consumableRepo')

async function execute(consumable){

    const result = await consumableRepo.updateConsumable(consumable)

    return result
}

module.exports.execute = execute;
