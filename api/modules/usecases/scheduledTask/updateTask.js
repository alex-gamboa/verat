const repo = require('../../db/scheduledTaskRepo')

async function execute(task){

    const result = await repo.updateTask(task)

    return result
}

module.exports.execute = execute;
