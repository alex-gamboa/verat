const mongoose = require('mongoose')

mongoose
    .connect('mongodb://localhost/verat')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Couldn\'t connect to MongoDB.'))

const ticketSchema =
    new mongoose.Schema({
        date: { type: Date, default: Date.now},
        description: {
            type: String,
            required: true,
            minlength: 10
        }
    })

const userSchema =
    new mongoose.Schema({
        username: String,
        password: String,
        fullName: String,
        canLogin: Boolean
    })

const assetCategorySchema =
    new mongoose.Schema({
        name: String
    })

const assetBrandSchema =
    new mongoose.Schema({
        name: {
            type: String,
            required: true
        }
    })

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
    })

const assetAreaSchema =
    new mongoose.Schema({
        name: {
            type: String,
            required: true
        }
    })

const assetSchema =
    new mongoose.Schema({
        controlNumber: String,
        dateOfCreation: { type: Date, default: Date.now},
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AssetCategory'
        },
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
        }, //obtenerlo de nomipaq
        area: String,
        status: {
            type: String,
            required: true
        },
        barcode: String,
        quantity: Number,
        lastCount: Date
    })

const TicketModel = mongoose.model('Ticket', ticketSchema)
const AssetCategoryModel = mongoose.model('AssetCategory', assetCategorySchema)
const AssetModel = mongoose.model('Asset', assetSchema)
const UserModel = mongoose.model('User', userSchema)
const AssetAreaModel = mongoose.model('AssetArea', assetAreaSchema)
const AssetBrandModel = mongoose.model('AssetBrand', assetBrandSchema)
const AssetKindModel = mongoose.model('AssetKind', assetKindSchema)


function getTicketInstance(obj){ return new TicketModel(obj) }

function getAssetKindInstance(obj) { return new AssetKindModel(obj) }

function getAssetBrandInstance(obj) { return new AssetBrandModel(obj) }

function getUserInstance(obj) { return new UserModel(obj) }

function getAssetAreaInstance(obj) { return new AssetAreaModel(obj) }

function getAssetCategoryInstance(obj) { return new AssetCategoryModel(obj) }

function getAssetInstance(obj) { return new AssetModel(obj) }

module.exports = {
    getTicketInstance: getTicketInstance,
    getAssetCategoryInstance: getAssetCategoryInstance,
    getAssetInstance: getAssetInstance,
    getAssetAreaInstance: getAssetAreaInstance,
    getAssetBrandInstance: getAssetBrandInstance,
    getAssetKindInstance: getAssetKindInstance,
    getUserInstance: getUserInstance,
    TicketModel: TicketModel,
    AssetCategoryModel:AssetCategoryModel,
    AssetModel: AssetModel,
    AssetAreaModel: AssetAreaModel,
    AssetBrandModel: AssetBrandModel,
    AssetKindModel: AssetKindModel,
    UserModel: UserModel
}
