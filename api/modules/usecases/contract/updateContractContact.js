const repo = require('../../db/contractRepo')

async function execute(contact){

    const result = await repo.updateContractContact(contact)

    return result
}

module.exports.execute = execute;
