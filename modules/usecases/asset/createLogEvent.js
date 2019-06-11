const assetRepo = require('../../db/assetRepo')

async function execute(log){
    const result =
        await
            assetRepo
                .insertAssetLog(log)

    return result
}

module.exports.execute = execute;
