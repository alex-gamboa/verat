var router = require('express').Router();

const getAssetAreas = require('../../modules/usecases/asset/getAssetAreas')

router.get('/', async (req, res) => {
    const error = null;

    const result = await getAssetAreas
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

module.exports = router;
