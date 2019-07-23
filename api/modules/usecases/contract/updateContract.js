const repo = require('../../db/contractRepo')

async function execute(contract){

    const result = await repo.updateContract(contract)

    return result
}

module.exports.execute = execute;
