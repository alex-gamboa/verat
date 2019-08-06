var router = require('express').Router();

const createConsumable = require('../../modules/usecases/consumable/createConsumable')
const getConsumables = require('../../modules/usecases/consumable/getConsumables')
const updateConsumable = require('../../modules/usecases/consumable/updateConsumable')
const getConsumableModels = require('../../modules/usecases/consumable/getConsumableModels')
const createConsumableHistory = require('../../modules/usecases/consumable/createConsumableHistory')
const getConsumableHistory = require('../../modules/usecases/consumable/getConsumableHistory')

router.get('/', async (req, res) => {
    const error = null;

    const result =
       await
            getConsumables
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.get('/models', async (req, res) => {
    const error = null;

    const result =
        await
            getConsumableModels
            .execute()
            .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.get('/history/:id', async (req, res) => {
    const error = null;

    const result =
        await
            getConsumableHistory
                .execute(req.params.id)
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.post('/history', async (req, res) => {
    let error
    let result

    result =
        await
            createConsumableHistory
            .execute(req.body)
            .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.post('/', async (req, res) => {
    const error = null;
    let result

    if(req.body._id) {
        result =
            await
                updateConsumable
                .execute(req.body)
                .catch(e => error = e)
    }
    else {
        result =
            await
                createConsumable
                .execute(req.body)
                .catch(e => error = e)
    }

    if (error) res.send(error)
    else res.send(result)
})

module.exports = router;
