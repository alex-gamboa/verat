var router = require('express').Router();

const createTicket = require('../../modules/usecases/ticket/createTicket')
const getTickets = require('../../modules/usecases/ticket/getTickets')
const updateTicket = require('../../modules/usecases/ticket/updateTicket')

router.get('/', async (req, res) => {
    const error = null;

    const result =
       await
            getTickets
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.post('/', async (req, res) => {
    const error = null
    let result

    let ticket = req.body

    if(!ticket.status) ticket.status = 'Sin Atender'
    ticket.assetId = ticket.asset._id
    ticket.assetControlNumber = ticket.asset.controlNumber

    if(ticket._id){
        result =
            await
                updateTicket
                .execute(ticket)
                .catch(e => error = e)
    }
    else {
        result =
            await
                createTicket
                .execute(ticket)
                .catch(e => error = e)
    }



    if (error) res.send(error)
    else res.send(result)
})

module.exports = router;
