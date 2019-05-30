const mongoose = require('mongoose')

mongoose
    .connect('mongodb://localhost/verat')
    .then(() => console.log('Connected to DB...'))
    .catch(err => console.log('Error trying to connect.'))

const ticketSchema =
    new mongoose.Schema({
        date: { type: Date, default: Date.now},
        description: {
            type: String,
            required: true,
            minlength: 10
        }
    })

const assetCategorySchema =
    new mongoose.Schema({
        name: String
    })

const assetSchema =
    new mongoose.Schema({
        controlNumber: String,
        dateOfCreation: { type: Date, default: Date.now},
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AssetCategory'
        },
        isWithoutControlNumber: Boolean
    })

// const userSchema;

const TicketModel = mongoose.model('Ticket', ticketSchema)
const AssetCateogyModel = mongoose.model('AssetCategory', assetCategorySchema)
const AssetModel = mongoose.model('Asset', assetSchema)

function getTicketInstance(obj){
        return new TicketModel(obj)
}

function getAssetCategoryInstance(obj) {
    return new AssetCateogyModel(obj)
}

function getAssetInstance(obj) {
    return new AssetModel(obj)
}

module.exports.getTicketInstance = getTicketInstance
module.exports.getAssetCategoryInstance = getAssetCategoryInstance
module.exports.getAssetInstance = getAssetInstance

module.exports.TicketModel = TicketModel
module.exports.AssetCateogyModel = AssetCateogyModel
module.exports.AssetModel = AssetModel
