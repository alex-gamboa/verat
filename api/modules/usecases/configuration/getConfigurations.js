const repo = require('../../db/configRepo')

async function execute(){

    let configs;

    configs = await repo.getConfigurations()

    return configs

}

module.exports.execute = execute;
