const config = require('../config')

//Use cases
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
const getAssetsForKind = require('../modules/usecases/asset/getAssetsForKind')

const createConsumable = require('../modules/usecases/consumable/createConsumable')
const getConsumables = require('../modules/usecases/consumable/getConsumables')
const updateConsumable = require('../modules/usecases/consumable/updateConsumable')
const getConsumableModels = require('../modules/usecases/consumable/getConsumableModels')
const createConsumableHistory = require('../modules/usecases/consumable/createConsumableHistory')

//Express Setup
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
// app.use(cors)
app.use(bodyParser.json())

//Other requires
const fs = require('fs')

// app.use(express.static('./public'));

app.use((req, res, next) => {

    const origin = req.get('origin')

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get('/api', (req, res) => {
    res.send('API Running.')
})

app.get('/api/init', async (req, res) => {

    if(config.dev){
        const error = null

        let result = await
            createAssetCategory
            .execute({
                name: 'COMPUTO'
            })
            .catch(e => error = e)

        result = await
            createAssetCategory
            .execute({
                name: 'REDES'
            })
            .catch(e => error = e)

        const category = Object.assign({}, result)

        result = await
            createAssetCategory
            .execute({
                name: 'TELEFONIA'
            })
            .catch(e => error = e)

        result = await addUser.execute("Alejandro")

        const user = Object.assign({}, result)

        result = await addUser.execute("Ricardo")



        let asset = {
            controlNumber: "CUU000001",
            category: category.id,
            kind: "CPU",
            brand: "DELL",
            model: "DELL-25858",
            isWithoutControlNumber: false,
            barcode: "3477d6d6677",
            serialNumber: "9938d8d77dd7d",
            user: user.id,
            area: "SISTEMAS",
            status: "Disponible",
            quantity: 1,
            categoryName: category.name
        }

        result =
            await
                    createAsset
                        .execute(asset)
                        .catch(e => error = e)


        res.send("done.");
    }

})

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

app.get('/api/logs/:id', async (req, res) => {
    const error = null;

    const result =
       await
            getLogs
                .execute(req.params['id'])
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

app.get('/api/assets', async (req, res) => {
    const error = null;

    const result =
       await
            getAsset
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

app.get('/api/assetsForKind/:kindName', async (req, res) => {
    const error = null;

    const result =
        await
            getAssetsForKind
            .execute(req.params['kindName'])
            .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

app.get('/api/consumables', async (req, res) => {
    const error = null;

    const result =
       await
            getConsumables
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

app.get('/api/consumableModels', async (req, res) => {
    const error = null;

    const result =
        await
            getConsumableModels
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

app.post('/api/consumableHistory', async (req, res) => {
    let error
    let result

    result =
        await
            createConsumableHistory
            .execute(req.body)
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

app.post('/api/consumables', async (req, res) => {
    const error = null;
    let result

    if(req.body._id) {
        result =
            await
                updateConsumable
                .execute(req.body)
                .catch(e => error = e)
    }
    else {
        result =
            await
                createConsumable
                .execute(req.body)
                .catch(e => error = e)
    }

    if (error) res.send(error)
    else res.send(result)
})

const port = 4890
app.listen(4890, () => console.log(`Listening on port ${port}`))
