const contractRepo = require('../../db/contractRepo')

async function execute(contractId){

    let contracts;

    contracts = await contractRepo.getContractContacts(contractId)

    return contracts

}

module.exports.execute = execute;
