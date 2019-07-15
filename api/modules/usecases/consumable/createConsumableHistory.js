const consumableRepo = require('../../db/consumableRepo')

async function execute(history){

    let result

    result = await consumableRepo.insertConsumableHistory(history)

    return result
}

module.exports.execute = execute;
