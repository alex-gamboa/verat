const repo = require('../../db/consumableRepo')
const assetRepo = require('../../db/assetRepo')

async function execute(id){
    let result = []
    let logs;

    logs = await repo.getConsumableHistory(id)

    for (const log of logs) {

        let date = log.dateOfCreation
        let asset = ''
        let user = ''

        if(log.isAsset)
            asset = await assetRepo.getAsset(log.itemId)
        else
            user = await assetRepo.getUser(log.itemId)

        result.push({
            date: date,
            asset: (asset) ? `${asset[0].controlNumber}-${asset[0].kind} ${asset[0].brand} ${asset[0].model}` : '',
            user: (user) ? user[0].fullName : ''
        })
    }

    return result
}

module.exports.execute = execute;
