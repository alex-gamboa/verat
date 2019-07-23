var router = require('express').Router();

const createConfiguration = require('../../modules/usecases/configuration/createConfiguration')
const getConfigurations = require('../../modules/usecases/configuration/getConfigurations')
const updateConfiguration = require('../../modules/usecases/configuration/updateConfiguration')

router.get('/', async (req, res) => {
    const error = null;

    const result =
       await
            getConfigurations
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.post('/', async (req, res) => {
    const error = null;
    let result

    if(req.body._id) {
        result =
            await
                updateConfiguration
                .execute(req.body)
                .catch(e => error = e)
    }
    else {
        result =
            await
                createConfiguration
                .execute(req.body)
                .catch(e => error = e)
    }

    if (error) res.send(error)
    else res.send(result)
})

module.exports = router;
