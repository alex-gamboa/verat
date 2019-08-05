var router = require('express').Router();
const auth = require('../../middleware/auth')

const createTicket = require('../../modules/usecases/ticket/createTicket')
const getTickets = require('../../modules/usecases/ticket/getTickets')
const updateTicket = require('../../modules/usecases/ticket/updateTicket')
const createSparePart = require('../../modules/usecases/ticket/createSparePart')
const getSpareParts = require('../../modules/usecases/ticket/getSpareParts')
const getFilteredTickets = require('../../modules/usecases/ticket/getFilteredTickets')


router.get('/', auth, async (req, res) => {
    const error = null;

    const result =
       await
            getTickets
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.get('/filter/:filter', async (req, res) => {
    const error = null;

    filter = JSON.parse(req.params.filter)

    const result =
       await
            getFilteredTickets
                .execute(filter)
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.get('/spareparts/:id', auth, async (req, res) => {
    const error = null;

    const result =
       await
            getSpareParts
                .execute(req.params.id)
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.post('/spareparts', auth, async (req, res) => {

    if(req.user.type != 'Soporte') res.status(400).send('No tiene privilegios para esta acción')

    const error = null
    let result

    result =
        await
            createSparePart
            .execute(req.body)
            .catch(e => error = e)


    if (error) res.send(error)
    else res.send(result)

})

router.post('/', auth, async (req, res) => {

    if(req.user.type != 'Soporte') res.status(400).send('No tiene privilegios para esta acción')
    else {

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
    }
})

module.exports = router;
