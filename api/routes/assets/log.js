var router = require('express').Router();

const createAssetLog = require('../../modules/usecases/asset/createLogEvent')
const getLogs = require('../../modules/usecases/asset/getLogs')

router.get('/:id', async (req, res) => {
    const error = null;

    const result =
       await
            getLogs
                .execute(req.params['id'])
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.post('/', async (req, res) => {
    const error = null

    const result =
        await createAssetLog
            .execute(req.body)
            .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

module.exports = router;
