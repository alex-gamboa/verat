const config = require('../../config')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

const dbServer = 'mongodb://' + config.mongoHost + ":" + config.mongoPort + '/' + config.mongoDBName

mongoose
    .connect(dbServer)
    // .then(() => {
    //     console.log('Connected to ' + dbServer)
    // })
    // .catch(err => console.log(`Couldn\'t connect to ${dbServer}.`))

autoIncrement.initialize(mongoose.connection)

const userSchema =
    new mongoose.Schema({
        username: String,
        password: String,
        fullName: String,
        canLogin: Boolean,
        type: String
    }, { collection: 'User'})

const userDocumentSchema =
    new mongoose.Schema({
        name: String,
        description: String,
        filePath: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        date: { type: Date, default: Date.now}
    }, { collection: 'UserDocument'})

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

const consumableSchema =
    new mongoose.Schema({
        dateOfCreation: { type: Date, default: Date.now},
        brand: String,
        model: String,
        kind: {
            type: String,
            required: true
        },
        barcode: String,
        quantity: Number,
        comments: String
    }, { collection: 'Consumable'})

const consumableHistorySchema =
    new mongoose.Schema({
        dateOfCreation: { type: Date, default: Date.now},
        consumable: {
            type: mongoose.Schema.Types.ObjectId
        },
        itemId: {
            type: mongoose.Schema.Types.ObjectId
        },
        isAsset: Boolean,
    }, { collection: 'ConsumableHistory'})

const contractContactSchema =
    new mongoose.Schema({
        name: String,
        type: String,
        phone: String,
        email: String,
        contract: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contract'
        }
    }, { collection: 'ContractContact'})

const contractSchema =
    new mongoose.Schema({
        name: String,
        details: String,
        portal: String,
        portalCredentials: String,
        billAmount:Number,
        renovation:String,
    }, { collection: 'Contract'})

const spartPartSchema =
    new mongoose.Schema({
        name: String,
        cost: Number,
        quantity: Number
    })

const ticketSchema =
    new mongoose.Schema({
        date: { type: Date, default: Date.now},
        ticketNumber: Number,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        userName:String,
        agent: String,
        description: {
            type: String,
            required: true,
            minlength: 1
        },
        solution: String,
        assetId: {
            type: mongoose.Schema.Types.ObjectId
        },
        assetControlNumber: String,
        service: String,
        type: String,
        hours: Number,
        spartParts: [spartPartSchema],
        status: String
    }, { collection: 'Ticket'})



ticketSchema.plugin(autoIncrement.plugin, {model: 'Ticket', field: 'ticketNumber'})

const TicketModel = mongoose.model('Ticket', ticketSchema)
const AssetCategoryModel = mongoose.model('AssetCategory', assetCategorySchema)
const AssetModel = mongoose.model('Asset', assetSchema)
const UserModel = mongoose.model('User', userSchema)
const UserDocumentModel = mongoose.model('UserDocument',userDocumentSchema)
const AssetAreaModel = mongoose.model('AssetArea', assetAreaSchema)
const AssetBrandModel = mongoose.model('AssetBrand', assetBrandSchema)
const AssetKindModel = mongoose.model('AssetKind', assetKindSchema)
const AssetLogModel = mongoose.model('AssetLog', assetLogSchema)

const ConsumableModel = mongoose.model('Consumable', consumableSchema)
const ConsumableHistoryModel = mongoose.model('ConsumableHistory', consumableHistorySchema)

const ContractModel = mongoose.model('Contract', contractSchema)
const ContractContactModel = mongoose.model('ContractContact', contractContactSchema)


function getContractInstance(obj) { return new ContractModel(obj) }

function getContractContactInstance(obj) { return new ContractContactModel(obj) }

function getTicketInstance(obj){ return new TicketModel(obj) }

function getAssetKindInstance(obj) { return new AssetKindModel(obj) }

function getAssetBrandInstance(obj) { return new AssetBrandModel(obj) }

function getUserInstance(obj) { return new UserModel(obj) }

function getUserDocumentInstance(obj) { return new UserDocumentModel(obj) }

function getAssetAreaInstance(obj) { return new AssetAreaModel(obj) }

function getAssetCategoryInstance(obj) { return new AssetCategoryModel(obj) }

function getAssetInstance(obj) { return new AssetModel(obj) }

function getAssetLogInstance(obj) { return new AssetLogModel(obj) }

function getConsumableInstance(obj) { return new ConsumableModel(obj) }

function getConsumableHistoryInstance(obj) { return new ConsumableHistoryModel(obj) }

module.exports = {
    getTicketInstance: getTicketInstance,
    getAssetCategoryInstance: getAssetCategoryInstance,
    getAssetInstance: getAssetInstance,
    getAssetAreaInstance: getAssetAreaInstance,
    getAssetBrandInstance: getAssetBrandInstance,
    getAssetKindInstance: getAssetKindInstance,
    getUserInstance: getUserInstance,
    getUserDocumentInstance: getUserDocumentInstance,
    getAssetLogInstance: getAssetLogInstance,
    getConsumableInstance: getConsumableInstance,
    getConsumableHistoryInstance:getConsumableHistoryInstance,
    TicketModel: TicketModel,
    AssetCategoryModel:AssetCategoryModel,
    AssetModel: AssetModel,
    ConsumableModel: ConsumableModel,
    AssetAreaModel: AssetAreaModel,
    AssetBrandModel: AssetBrandModel,
    AssetKindModel: AssetKindModel,
    UserModel: UserModel,
    AssetLogModel: AssetLogModel,
    ConsumableHistoryModel: ConsumableHistoryModel,
    UserDocumentModel: UserDocumentModel,
    getContractInstance: getContractInstance,
    getContractContactInstance: getContractContactInstance
}
