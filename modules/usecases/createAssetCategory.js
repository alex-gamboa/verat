const mongoAdapter = require('../db/mongo_db_adapter')

async function execute(asset){
    const result =
        await
            mongoAdapter
                .insertAssetCategory(asset)

    return result
}

module.exports.execute = execute;
