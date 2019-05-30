const express = require('express')
const app = express()
const createTicket = require('../modules/usecases/createTicket')
const createAssetCategory = require('../modules/usecases/createAssetCategory')
const createAsset = require('../modules/usecases/createAsset')
const getTickets = require('../modules/usecases/getTickets')

app.use(express.json())
app.use(express.static('../public'));

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

    const asset = {
        controlNumber: req.body.controlNumber,
        category: req.body.category,
        isWithoutControlNumber: req.body.isWithoutControlNumber
    }

    const result =
       await
            createAsset
                .execute(asset)
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
