var router = require('express').Router();

const createContract = require('../../modules/usecases/contract/createContract')
const getContracts = require('../../modules/usecases/contract/getContracts')
const updateContract = require('../../modules/usecases/contract/updateContract')
const createContractContact = require('../../modules/usecases/contract/createContractContact')
const getContractContacts = require('../../modules/usecases/contract/getContractContacts')
const updateContractContact = require('../../modules/usecases/contract/updateContractContact')

router.get('/', async (req, res) => {
    const error = null;

    const result =
       await
            getContracts
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.get('/contact/:contractId', async (req, res) => {
    const error = null;

    const result =
        await
            getContractContacts
            .execute(req.params.contractId)
            .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.post('/contact', async (req, res) => {
    let error
    let result

    if (req.body._id) {
        result =
            await
                updateContractContact
                .execute(req.body)
                .catch(e => error = e)
    }
    else {
        result =
            await
                createContractContact
                .execute(req.body)
                .catch(e => error = e)
    }

    if (error) res.send(error)
    else res.send(result)
})

router.post('/', async (req, res) => {
    const error = null;
    let result

    if(req.body._id) {
        result =
            await
                updateContract
                .execute(req.body)
                .catch(e => error = e)
    }
    else {
        result =
            await
                createContract
                .execute(req.body)
                .catch(e => error = e)
    }

    if (error) res.send(error)
    else res.send(result)
})

module.exports = router;
