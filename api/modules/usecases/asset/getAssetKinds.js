const assetRepo = require('../../db/assetRepo')

async function execute(category){
    let result = []

    if (category) {
        let dbCategory = await assetRepo.getCategoryByName(category)

        if(dbCategory.length)
            result = await assetRepo.getKindsForCategory(dbCategory[0].id)
    }
    else
        result = await assetRepo.getKinds()

    return result
}

module.exports.execute = execute;
