const mongoAdapter = require('../db/assetRepo')

async function execute(ticket){
    const result =
        await
            mongoAdapter
                .insertTicket(ticket)

    return result
}

module.exports.execute = execute;
