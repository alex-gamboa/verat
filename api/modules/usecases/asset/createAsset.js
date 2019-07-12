const assetRepo = require('../../db/assetRepo')

async function execute(asset){

    let result

    console.log(asset);

    if(!asset.category)
    {
        result = await assetRepo.getCategoryByName(asset.categoryName)
        console.log(result);
        if(result) asset.category = result[0]._id
    }
    else
        asset.category = null

    if(!asset.user)
    {
        result = await assetRepo.getUserByName(asset.userName)
        console.log(result);
        if(result) asset.user = result[0]._id
    }
    else
        asset.user = null

    asset.status = (asset.user) ? 'Asignado' : 'Disponible'

    console.log(asset);


    result = await assetRepo.insertAsset(asset)

    return result
}

module.exports.execute = execute;
