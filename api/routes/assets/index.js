var router = require('express').Router();
const auth = require('../../middleware/auth')
const assetRepo = require('../../modules/db/assetRepo')

const createAsset = require('../../modules/usecases/asset/createAsset')
const getAsset = require('../../modules/usecases/asset/getAsset')
const updateAsset = require('../../modules/usecases/asset/updateAsset')
const countAsset = require('../../modules/usecases/asset/countAsset')
const getAssetsForKind = require('../../modules/usecases/asset/getAssetsForKind')
const getFilteredAssets = require('../../modules/usecases/asset/getFilteredAssets')

const createAssetCategory = require('../../modules/usecases/asset/createAssetCategory')
const getAssetCategories = require('../../modules/usecases/asset/getAssetCategories')
const getAssetKinds = require('../../modules/usecases/asset/getAssetKinds')

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

router.get('/filter/:filter', async (req, res) => {
    const error = null;

    filter = JSON.parse(req.params.filter)

    const result =
       await
            getFilteredAssets
                .execute(filter)
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

router.get('/categories', async (req, res) => {
    let error = null;

    const result =
       await
       getAssetCategories
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.get('/kind/category/:category', async (req, res) => {
    const error = null;

    const result =
       await
       getAssetKinds
                .execute(req.params.category)
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.get('/kinds', async (req, res) => {
    let error = null;

    const result =
        await
            assetRepo
            .getKinds()
            .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.get('/brands', async (req, res) => {
    let error = null;

    const result =
        await
            assetRepo
            .getAssetBrands()
            .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.get('/areas', async (req, res) => {
    let error = null;

    const result =
        await
            assetRepo
            .getAssetAreas()
            .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})



router.get('/:controlNumber', async (req, res) => {
    let error = null;

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

router.post('/categories', async (req, res) => {
    let error = null;

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

router.post('/kinds', async (req, res) => {
    let error = null;

    const result =
        await
            assetRepo.insertKind(req.body)

    if (error) res.send(error)
    else res.send(result)
})

router.post('/brands', async (req, res) => {
    let error = null;

    const result =
        await
            assetRepo.insertBrand(req.body)

    if (error) res.send(error)
    else res.send(result)
})

router.post('/areas', async (req, res) => {
    let error = null;

    const result =
        await
            assetRepo.insertArea(req.body)

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
