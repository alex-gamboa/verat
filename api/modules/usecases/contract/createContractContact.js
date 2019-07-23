const contractRepo = require('../../db/contractRepo')

async function execute(contact){

    let result

    result = await contractRepo.insertContractContact(contact)

    return result
}

module.exports.execute = execute;
