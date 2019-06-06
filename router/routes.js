const express = require('express')
const createTicket = require('../modules/usecases/createTicket')
const createAssetCategory = require('../modules/usecases/asset/createAssetCategory')
const createAsset = require('../modules/usecases/asset/createAsset')
const getTickets = require('../modules/usecases/getTickets')
const getAssetCategories = require('../modules/usecases/asset/getAssetCategories')
const getAssetKinds = require('../modules/usecases/asset/getAssetKinds')
const getAsset = require('../modules/usecases/asset/getAsset')
const updateAsset = require('../modules/usecases/asset/updateAsset')
const getAssetAreas = require('../modules/usecases/asset/getAssetAreas')
const addUser = require('../modules/usecases/user/addUser')
const getUsers = require('../modules/usecases/user/getUsers')

const fs = require('fs')

const app = express()

app.use(express.json())
app.use(express.static('./public'));

app.get('/api/tickets', async (req, res) => {
    const error = null;

    const result =
       await
            getTickets
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

app.get('/api/assets/:controlNumber', async (req, res) => {
    const error = null;

    console.error(req.params.controlNumber);

    const result =
       await
            getAsset
                .execute(req.params.controlNumber)
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

app.get('/api/assetCategories', async (req, res) => {
    const error = null;

    const result =
       await
       getAssetCategories
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

app.get('/api/assetKinds', async (req, res) => {
    const error = null;

    const result =
       await
       getAssetKinds
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

app.get('/api/assetAreas', async (req, res) => {
    const error = null;

    const result = await getAssetAreas
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

app.get('/api/users', async (req, res) => {
    const error = null;

    const result = await getUsers
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

app.get('/api/processEmployeesFiles', async (req, res) => {

    try {
        fs.readFile('itstaff.txt','utf16le', function(err, data) {
            data
                .split(/\r?\n/)
                .forEach(line => {
                    if(line.trim())
                        addUser.execute(line.trim())
                })
        })
    } catch (error) {
        console.log('Error reading file')
    }


})

app.get('/api/assetKinds/:category', async (req, res) => {
    const error = null;

    const result =
       await
       getAssetKinds
                .execute(req.params.category)
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

app.post('/api/tickets', async (req, res) => {
    const error = null;

    const ticket = {
        description: req.body.description
    }

    const result =
       await
            createTicket
                .execute(ticket)
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

app.post('/api/assets/contabilizar', async (req, res) => {
    const error = null;

    const result =
       await
            updateAsset
                .execute(req.body.asset)
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

app.post('/api/assetCategories', async (req, res) => {
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

app.post('/api/assets', async (req, res) => {
    const error = null;

    let asset = {
        controlNumber: req.body.controlNumber,
        category: req.body.category,
        kind: req.body.kind,
        brand: req.body.brand,
        model: req.body.model,
        isWithoutControlNumber: req.body.isWithoutControlNumber,
        barcode: req.body.barcode,
        serialNumber: req.body.serialNumber,
        user: (req.body.user) ? req.body.user : null,
        area: req.body.area,
        status: "Disponible",
        quantity: req.body.quantity
    }

    let result =
       await
            createAsset
                .execute(asset)
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
