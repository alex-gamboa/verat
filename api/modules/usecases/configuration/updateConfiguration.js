const repo = require('../../db/configRepo')

async function execute(config){

    const result = await repo.updateConfiguration(config)

    return result
}

module.exports.execute = execute;
