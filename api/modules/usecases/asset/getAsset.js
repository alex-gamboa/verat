const assetRepo = require('../../db/assetRepo')

async function execute(controlNumber){

    let assets

    if(controlNumber)
        assets = await assetRepo.getAsset(controlNumber)
    else
        assets = await assetRepo.getAssets()

    for (let asset of assets) {

        await
            assetRepo
                .getCategoryById(asset.category)
                .then(category => {
                    if(category && category.length > 0) asset.categoryName = category[0].name
                })

        await
            assetRepo
                .getUser(asset.user)
                .then(user => {
                    if(user && user.length > 0) asset.userName = user[0].fullName
                })

    }

    return assets

}

module.exports.execute = execute;
