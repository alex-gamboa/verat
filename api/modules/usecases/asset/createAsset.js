const assetRepo = require('../../db/assetRepo')

async function execute(asset){

    let result

    if(!asset.category)
    {
        result = await assetRepo.getCategoryByName(asset.categoryName)
        if(result) asset.category = result[0]._id
    }
    else
        asset.category = null

    if(!asset.user)
    {
        result = await assetRepo.getUserByName(asset.userName)
        if(result) asset.user = result[0]._id
    }
    else
        asset.user = null

    if(!asset.status)
        asset.status = (asset.user) ? 'Asignado' : 'Disponible'

    result = await assetRepo.insertAsset(asset)

    return result
}

module.exports.execute = execute;
