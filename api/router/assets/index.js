var router = require('express').Router();

const createAsset = require('../../modules/usecases/asset/createAsset')
const getAsset = require('../../modules/usecases/asset/getAsset')
const updateAsset = require('../../modules/usecases/asset/updateAsset')
const countAsset = require('../../modules/usecases/asset/countAsset')
const getAssetsForKind = require('../../modules/usecases/asset/getAssetsForKind')

//GET

router.get('/kind/:kindName', async (req, res) => {
    const error = null;

    const result =
        await
            getAssetsForKind
            .execute(req.params['kindName'])
            .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.get('/', async (req, res) => {
    const error = null;

    const result =
       await
            getAsset
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.get('/:controlNumber', async (req, res) => {
    const error = null;

    const result =
       await
            getAsset
                .execute(req.params.controlNumber)
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

//POST
router.post('/contabilizar', async (req, res) => {
    const error = null;

    const result = await countAsset
        .execute(req.body.asset)
        .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.post('/', async (req, res) => {
    let error
    let result

    if(req.body._id) {
        result =
            await
                updateAsset
                    .execute(req.body)
                    .catch(e => error = e)
    }
    else {
        result =
            await
                createAsset
                    .execute(req.body)
                    .catch(e => error = e)
    }

    if (error) res.send(error)
    else res.send(result)
})

//PUT
router.put('/', async (req, res) => {
    const error = null;

    const result =
       await
            updateAsset
                .execute(req.body)
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

module.exports = router;
