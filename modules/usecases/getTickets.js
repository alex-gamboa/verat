const mongoAdapter = require('../db/assetRepo')

async function execute(){
    const result =
        await mongoAdapter.getTickets()

    return result
}

module.exports.execute = execute;
