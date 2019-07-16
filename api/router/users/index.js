var router = require('express').Router();

const addUser = require('../../modules/usecases/user/addUser')
const getUsers = require('../../modules/usecases/user/getUsers')
const getUserDocuments = require('../../modules/usecases/user/getUserDocuments')

router.get('/', async (req, res) => {
    const error = null;

    const result = await getUsers
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.get('/documents/:id', async (req, res) => {
    const error = null;

    const result = await getUserDocuments
                .execute(req.params.id)
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

module.exports = router;
