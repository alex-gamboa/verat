const assetRepo = require('../../db/assetRepo')

async function execute(asset){
    const result =
        await
            assetRepo
                .insertAssetCategory(asset)

    return result
}

module.exports.execute = execute;
