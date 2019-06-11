const assetRepo = require('../../db/assetRepo')

async function execute(log){

    // log.date = new Date(((new Date()).getTime()) - ((new Date()).getTimezoneOffset() * 60000))

    const result =
        await
            assetRepo
                .insertAssetLog(log)

    return result
}

module.exports.execute = execute;
