var router = require('express').Router();

const getAssetKinds = require('../../modules/usecases/asset/getAssetKinds')

router.get('/', async (req, res) => {
    const error = null;

    const result =
        await
            getAssetKinds
            .execute()
            .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.get('/category/:category', async (req, res) => {
    const error = null;

    const result =
       await
       getAssetKinds
                .execute(req.params.category)
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

module.exports = router;
