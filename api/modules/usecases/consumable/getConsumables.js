const consumableRepo = require('../../db/consumableRepo')

async function execute(){

    let consumables;

    consumables = await consumableRepo.getConsumables()

    return consumables

}

module.exports.execute = execute;
