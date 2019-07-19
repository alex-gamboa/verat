const fs = require('fs')
const config = require('./config')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static(config.nodePublicPath));

app.use(bodyParser.json())

app.use((req, res, next) => {

    const origin = req.get('origin')

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api', require('./router'));

const port = 4890
app.listen(4890, () => console.log(`Listening on port ${port}`))

