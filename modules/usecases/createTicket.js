const mongoAdapter = require('../db/mongo_db_adapter')

async function execute(ticket){
    const result =
        await
            mongoAdapter
                .insertTicket(ticket)

    return result
}

module.exports.execute = execute;
