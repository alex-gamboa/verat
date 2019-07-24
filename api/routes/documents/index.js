var router = require('express').Router();

const createDocument = require('../../modules/usecases/document/createDocument')
const getDocuments = require('../../modules/usecases/document/getDocuments')
const updateDocument = require('../../modules/usecases/document/updateDocument')

router.get('/', async (req, res) => {
    const error = null;

    const result =
       await
            getDocuments
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
                updateDocument
                .execute(req.body)
                .catch(e => error = e)
    }
    else {
        result =
            await
                createDocument
                .execute(req.body)
                .catch(e => error = e)
    }

    if (error) res.send(error)
    else res.send(result)
})

module.exports = router;
