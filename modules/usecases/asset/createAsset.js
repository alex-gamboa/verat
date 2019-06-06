const assetRepo = require('../../db/assetRepo')

async function execute(asset){

    asset.status = (asset.user) ? 'assigned' : 'available'

    let result = await assetRepo.getCategoryByName(asset.category);

    if(result) {
        asset.category = result[0].id;
        result = await assetRepo.insertAsset(asset)
    }

    return result
}

module.exports.execute = execute;
