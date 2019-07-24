var router = require('express').Router();

const getAssetsByCategory = require('../../modules/usecases/report/getAssetsByCategory')
const getAssetsByStatus = require('../../modules/usecases/report/getAssetsByStatus')

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

module.exports = router;
