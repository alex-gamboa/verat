var router = require('express').Router();

const getAssetBrands = require('../../modules/usecases/asset/getAssetBrands')

router.get('/', async (req, res) => {
    const error = null;

    const result = await getAssetBrands
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

module.exports = router;
