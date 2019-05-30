const mongoAdapter = require('../db/mongo_db_adapter')

async function execute(asset){
    const result =
        await
            mongoAdapter
                .insertAsset(asset)

    return result
}

module.exports.execute = execute;
