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
const countAsset = require('../modules/usecases/asset/countAsset')
const getAssetBrands = require('../modules/usecases/asset/getAssetBrands')
const createAssetLog = require('../modules/usecases/asset/createLogEvent')
const getLogs = require('../modules/usecases/asset/getLogs')

const fs = require('fs')
const cors = require('cors')

const app = express()// app.use(cors())


app.use(express.json())
app.use(express.static('./public'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



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

app.get('/api/logs/:controlNumber', async (req, res) => {
    const error = null;

    const result =
       await
            getLogs
                .execute(req.params['controlNumber'])
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

app.get('/api/assets', cors(), async (req, res) => {
    const error = null;

    const result =
       await
            getAsset
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

app.get('/api/assets/:controlNumber', async (req, res) => {
    const error = null;

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

app.get('/api/assetBrands', async (req, res) => {
    const error = null;

    const result = await getAssetBrands
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

app.get('/api/assetStates', async (req, res) => {

    let error = null
    if (error) res.send(error)
    else res.send(['Disponible','Asignado','Reparación', 'Scrap', 'Baja'])
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

app.get('/api/processAssetsFile', async (req, res) => {

    try {
        fs.readFile('tablets.csv','utf-8', function(err, data) {
            data
                .split(/\r?\n/)
                .forEach(line => {
                    let parts = line.split(',')

                    if(parts.length == 3){
                            let asset = {
                                controlNumber: parts[2],
                                category: null,
                                kind: "TABLET",
                                brand: parts[0],
                                model: parts[1],
                                isWithoutControlNumber: null,
                                barcode: null,
                                serialNumber: null,
                                user: null,
                                area: null,
                                status: null,
                                quantity: null
                            }

                            createAsset.execute(asset)
                        }
                })
        })

        fs.readFile('activos.csv','utf-8', function(err, data) {
            data
                .split(/\r?\n/)
                .forEach(line => {
                    let parts = line.split(',')

                    if(parts.length == 5){
                        let asset = {
                            controlNumber: parts[4],
                            category: null,
                            kind: parts[0],
                            brand: parts[1],
                            model: parts[2],
                            isWithoutControlNumber: null,
                            barcode: null,
                            serialNumber: parts[3].trim(),
                            user: null,
                            area: null,
                            status: "Disponible",
                            quantity: null
                        }

                        createAsset.execute(asset)
                    }
                })
        })

        fs.readFile('celulares.csv','utf-8', function(err, data) {
            data
                .split(/\r?\n/)
                .forEach(line => {
                    let parts = line.split(',')

                    if(parts.length == 3){
                            let asset = {
                                controlNumber: parts[2],
                                category: null,
                                kind: "TABLET",
                                brand: parts[0],
                                model: parts[1],
                                isWithoutControlNumber: null,
                                barcode: null,
                                serialNumber: null,
                                user: null,
                                area: null,
                                status: null,
                                quantity: null
                            }

                            createAsset.execute(asset)
                        }
                })
        })
    } catch (error) {
        console.log('Error reading file')
    }


})

app.get('/api/processEmployeesFiles', async (req, res) => {

    try {
        // fs.readFile('itstaff.txt','utf16le', function(err, data) {
        //     data
        //         .split(/\r?\n/)
        //         .forEach(line => {
        //             if(line.trim())
        //                 addUser.execute(line.trim())
        //         })
        // })

        fs.readFile('itnext.txt','utf16le', function(err, data) {
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

    const result = await countAsset
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

app.post('/api/logs', async (req, res) => {
    const error = null

    const result =
        await createAssetLog
            .execute(req.body)
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
        quantity: req.body.quantity,
        categoryName: req.body.categoryName
    }

    let result =
       await
            createAsset
                .execute(asset)
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

app.put('/api/assets', async (req, res) => {
    const error = null;

    const result =
       await
            updateAsset
                .execute(req.body)
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
