const mongoAdapter = require('../db/mongo_db_adapter')

async function execute(){
    const result =
        await mongoAdapter.getTickets()

    return result
}

module.exports.execute = execute;
