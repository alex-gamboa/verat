const contractRepo = require('../../db/contractRepo')

async function execute(){

    let contracts;

    contracts = await contractRepo.getContracts()

    return contracts

}

module.exports.execute = execute;
