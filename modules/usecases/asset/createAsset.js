const assetRepo = require('../../db/assetRepo')

async function execute(asset){

    let result

    asset.status = (asset.user) ? 'assigned' : 'available'

    if(asset.category)
    {
        result = await assetRepo.getCategoryByName(asset.category)
        if(result) asset.category = result[0].id
    }
    else
        asset.category = null


    result = await assetRepo.insertAsset(asset)

    return result
}

module.exports.execute = execute;
