const repo = require('../../db/scheduledTaskRepo')

async function execute(task){

    let result = await repo.insertTask(task)

    return result
}

module.exports.execute = execute;
