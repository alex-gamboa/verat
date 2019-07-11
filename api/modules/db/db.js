const config = require('../../config')
const mongoose = require('mongoose')

const dbServer = 'mongodb://' + config.mongoHost + ":" + config.mongoPort + '/' + config.mongoDBName


mongoose
    .connect(dbServer)
    .then(() => console.log('Connected to ' + dbServer))
    .catch(err => console.log(`Couldn\'t connect to ${dbServer}.`))

const ticketSchema =
    new mongoose.Schema({
        date: { type: Date, default: Date.now},
        description: {
            type: String,
            required: true,
            minlength: 10
        }
    }, { collection: 'Ticket'})

const userSchema =
    new mongoose.Schema({
        username: String,
        password: String,
        fullName: String,
        canLogin: Boolean
    }, { collection: 'User'})

const assetCategorySchema =
    new mongoose.Schema({
        name: String
    }, { collection: 'AssetCategory'})

const assetBrandSchema =
    new mongoose.Schema({
        name: {
            type: String,
            required: true
        }
    }, { collection: 'AssetBrand'})

const assetKindSchema =
    new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AssetCategory'
        }
    }, { collection: 'AssetKind'})

const assetAreaSchema =
    new mongoose.Schema({
        name: {
            type: String,
            required: true
        }
    }, { collection: 'AssetArea'})

const assetLogSchema =
    new mongoose.Schema({
        date: Date,
        user: String,
        asset: String,
        assetControlNumber: String,
        documentId: mongoose.Schema.Types.ObjectId,
        event: String,
        oldValue: String,
        newValue: String,
        reason: String
    })

const assetSchema =
    new mongoose.Schema({
        controlNumber: String,
        dateOfCreation: { type: Date, default: Date.now},
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AssetCategory'
        },
        categoryName: String,
        isWithoutControlNumber: Boolean,
        brand: String,
        model: String,
        kind: {
            type: String,
            required: true
        },
        serialNumber: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        userName: String,
        area: String,
        status: {
            type: String,
            required: true
        },
        barcode: String,
        quantity: Number,
        lastCount: Date,
        comments: String
    }, { collection: 'Asset'})

const TicketModel = mongoose.model('Ticket', ticketSchema)
const AssetCategoryModel = mongoose.model('AssetCategory', assetCategorySchema)
const AssetModel = mongoose.model('Asset', assetSchema)
const UserModel = mongoose.model('User', userSchema)
const AssetAreaModel = mongoose.model('AssetArea', assetAreaSchema)
const AssetBrandModel = mongoose.model('AssetBrand', assetBrandSchema)
const AssetKindModel = mongoose.model('AssetKind', assetKindSchema)
const AssetLogModel = mongoose.model('AssetLog', assetLogSchema)


function getTicketInstance(obj){ return new TicketModel(obj) }

function getAssetKindInstance(obj) { return new AssetKindModel(obj) }

function getAssetBrandInstance(obj) { return new AssetBrandModel(obj) }

function getUserInstance(obj) { return new UserModel(obj) }

function getAssetAreaInstance(obj) { return new AssetAreaModel(obj) }

function getAssetCategoryInstance(obj) { return new AssetCategoryModel(obj) }

function getAssetInstance(obj) { return new AssetModel(obj) }

function getAssetLogInstance(obj) { return new AssetLogModel(obj) }

module.exports = {
    getTicketInstance: getTicketInstance,
    getAssetCategoryInstance: getAssetCategoryInstance,
    getAssetInstance: getAssetInstance,
    getAssetAreaInstance: getAssetAreaInstance,
    getAssetBrandInstance: getAssetBrandInstance,
    getAssetKindInstance: getAssetKindInstance,
    getUserInstance: getUserInstance,
    getAssetLogInstance: getAssetLogInstance,
    TicketModel: TicketModel,
    AssetCategoryModel:AssetCategoryModel,
    AssetModel: AssetModel,
    AssetAreaModel: AssetAreaModel,
    AssetBrandModel: AssetBrandModel,
    AssetKindModel: AssetKindModel,
    UserModel: UserModel,
    AssetLogModel: AssetLogModel
}
