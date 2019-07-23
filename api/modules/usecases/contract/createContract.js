const contractRepo = require('../../db/contractRepo')

async function execute(contract){

    let result

    result = await contractRepo.insertContract(contract)

    return result
}

module.exports.execute = execute;
