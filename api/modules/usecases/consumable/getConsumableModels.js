const consumableRepo = require('../../db/consumableRepo')

async function execute(){

    let consumables;

    consumables = await consumableRepo.getConsumableModels()

    return consumables

}

module.exports.execute = execute;
