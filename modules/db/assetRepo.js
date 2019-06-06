const mongoose = require('mongoose')
const db = require('./db')


//GET

async function  getAssetAreas(){

    const result = await db.AssetAreaModel.find().sort('name')

    return result
}


async function getAssets() {

    const result = await db.AssetModel.find()

    return result
}

function getUsers() {

    const result = db.UserModel.find().sort('fullName')

    return result
}

async function getAsset(controlNumber) {

    const result = await db.AssetModel.find().where('controlNumber', controlNumber);

    if (!result) result = await db.AssetModel.find().where('barcode', controlNumber)

    return result
}

function getCategoryByName(name) {

    return db.AssetCategoryModel.find().where('name', name)
}

async function getCategories() {
    const result = await db.AssetCategoryModel.find().sort('name')

    return result
}

async function getKinds() {
    const result = await db.AssetKindModel.find().sort('name')

    return result
}

function getKindsForCategory(id) {

    return db.AssetKindModel.find().where('category', id).sort('name')
}

//INSERT

async function insertUser(user) {

    console.log(user);

    let dbUser = db.getUserInstance(user)

    console.log(dbUser);


    const result =
        await dbUser
            .validate()
            .then(_ => dbUser.save())
            .catch(e => {
                console.log(e);
            })

    return result

}
async function insertAsset(asset) {

    let dbAsset = db.getAssetInstance(asset)

    const result =
        await dbAsset
            .validate()
            .then(_ => dbAsset.save())
            .catch(e => {
                console.log(e);
            })

    return result
}

async function insertAssetCategory(category) {
    let dbAssetCategory = db.getAssetCategoryInstance(category)

    const result =
        await dbAssetCategory
            .validate()
            .then(_ => dbAssetCategory.save())

    return result
}

async function deleteAsset(id) {

    const result =
        await db.AssetModel
            .deleteOne({ _id: id})

    return result
}

async function updateAsset(asset) {

    console.log(asset)

    const result =
        await db.AssetModel
            .updateOne({ _id: asset.id }, asset)

    return result
}

module.exports = {
    getAssetAreas: getAssetAreas,
    getAsset: getAsset,
    getAssets: getAssets,
    insertAsset: insertAsset,
    deleteAsset: deleteAsset,
    updateAsset: updateAsset,
    getCategoryByName: getCategoryByName,
    getCategories: getCategories,
    getKinds: getKinds,
    insertAssetCategory: insertAssetCategory,
    getKindsForCategory: getKindsForCategory,
    insertUser: insertUser,
    getUsers: getUsers
}
