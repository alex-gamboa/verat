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

// const userSchema;
// const assetSchema;

const TicketModel = mongoose.model('Ticket',ticketSchema)

function getTicketInstance(obj){
        return new TicketModel(obj)
}

module.exports.getTicketInstance = getTicketInstance
module.exports.TicketModel = TicketModel
