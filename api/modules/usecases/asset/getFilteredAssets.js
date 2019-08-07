const repo = require('../../db/assetRepo')

async function execute(filter){

    let assets

    if (filter.type === 'Category')
        assets = await repo.getAssetsForCategory(filter.value)
    else if(filter.type === 'Kind')
        assets = await repo.getAssetsForKind(filter.value)
    else if(filter.type === 'Brand')
        assets = await repo.getAssetsForBrand(filter.value)
    else if(filter.type === 'Status')
        assets = await repo.getAssetsForStatus(filter.value)
    else if(filter.type === 'User')
        assets = await repo.getAssetsForUser(filter.value)
    else if(filter.type === 'Area') {
        assets = await repo.getAssetsForArea(filter.value)
    }

    return assets
}

module.exports.execute = execute;
