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
