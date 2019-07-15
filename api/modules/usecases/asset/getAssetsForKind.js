const assetRepo = require('../../db/assetRepo')

async function execute(kindName){

    let assets

    assets = await assetRepo.getAssetsForKind(kindName)

    return assets
}

module.exports.execute = execute;
