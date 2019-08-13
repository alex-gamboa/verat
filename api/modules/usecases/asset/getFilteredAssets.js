const repo = require('../../db/assetRepo')

async function execute(filter){

    let assets

    if (filter.type === 'Categoria')
        assets = await repo.getAssetsForCategory(filter.value)
    else if(filter.type === 'Tipo')
        assets = await repo.getAssetsForKind(filter.value)
    else if(filter.type === 'Marca')
        assets = await repo.getAssetsForBrand(filter.value)
    else if(filter.type === 'Estado')
        assets = await repo.getAssetsForStatus(filter.value)
    else if(filter.type === 'Usuario')
        assets = await repo.getAssetsForUser(filter.value)
    else if(filter.type === 'Área') {
        assets = await repo.getAssetsForArea(filter.value)
    }

    return assets
}

module.exports.execute = execute;
