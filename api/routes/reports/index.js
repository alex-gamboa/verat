var router = require('express').Router();

const getAssetsByCategory = require('../../modules/usecases/report/getAssetsByCategory')
const getAssetsByStatus = require('../../modules/usecases/report/getAssetsByStatus')
const getAssetsByKind = require('../../modules/usecases/report/getAssetsByKind')
const getAssetsByBrand = require('../../modules/usecases/report/getAssetsByBrand')

router.get('/assets/bycategory', async (req, res) => {
    const error = null;

    const result =
       await
            getAssetsByCategory
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.get('/assets/bystatus', async (req, res) => {
    const error = null;

    const result =
       await
            getAssetsByStatus
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.get('/assets/bykind', async (req, res) => {
    const error = null;

    const result =
       await
            getAssetsByKind
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.get('/assets/bybrand', async (req, res) => {
    const error = null;

    const result =
       await
            getAssetsByBrand
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

module.exports = router;
