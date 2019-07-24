var router = require('express').Router();

const createAssetCategory = require('../../modules/usecases/asset/createAssetCategory')
const getAssetCategories = require('../../modules/usecases/asset/getAssetCategories')

router.get('/', async (req, res) => {
    const error = null;

    const result =
       await
       getAssetCategories
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.post('/', async (req, res) => {
    const error = null;

    const assetCategory = {
        name: req.body.name
    }

    const result =
       await
            createAssetCategory
                .execute(assetCategory)
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

module.exports = router;
