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

async function getAssetsByKind() {

    const result =
        await
            db.AssetModel.aggregate([
                {
                    "$group": {
                        "_id": "$kind",
                        count: { $sum: 1 }
                    }
                }
            ])

    return result
}

async function getAssetsByBrand() {

    const result =
        await
            db.AssetModel.aggregate([
                {
                    "$group": {
                        "_id": "$brand",
                        count: { $sum: 1 }
                    }
                }
            ])

    return result
}

module.exports = {
    getAssetsByCategory,
    getAssetsByStatus,
    getAssetsByKind,
    getAssetsByBrand
}
