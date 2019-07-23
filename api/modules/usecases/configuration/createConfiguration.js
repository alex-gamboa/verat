const repo = require('../../db/configRepo')

async function execute(config){

    let result

    result = await repo.insertConfiguration(config)

    return result
}

module.exports.execute = execute;
