const repo = require('../../db/scheduledTaskRepo')

async function execute(){

    let documents = await repo.getTasks()

    return documents

}

module.exports.execute = execute;
