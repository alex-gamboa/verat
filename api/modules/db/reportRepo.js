const mongoose = require('mongoose')
const db = require('./db')


async function getAssetsByCategory() {

    const result =
        await
            db.AssetModel.aggregate([
                {
                    "$group": {
                        "_id": "$categoryName",
                        count: { $sum: 1 }
                    }
                }
            ])

    return result
}

async function getAssetsByStatus() {

    const result =
        await
            db.AssetModel.aggregate([
                {
                    "$group": {
                        "_id": "$status",
                        count: { $sum: 1 }
                    }
                }
            ])

    return result
}

module.exports = {
    getAssetsByCategory: getAssetsByCategory,
    getAssetsByStatus: getAssetsByStatus
}
