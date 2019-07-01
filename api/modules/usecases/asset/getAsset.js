const assetRepo = require('../../db/assetRepo')

function getName(asset) {

}
async function execute(controlNumber){

    let assets
    let result = []

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
                    // result.push(temp[index])
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
