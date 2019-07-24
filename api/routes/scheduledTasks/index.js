var router = require('express').Router();

const createTask = require('../../modules/usecases/scheduledTask/createTask')
const getTasks = require('../../modules/usecases/scheduledTask/getTasks')
const updateTask = require('../../modules/usecases/scheduledTask/updateTask')

router.get('/', async (req, res) => {
    const error = null;

    const result =
       await
            getTasks
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
                updateTask
                .execute(req.body)
                .catch(e => error = e)
    }
    else {
        result =
            await
                createTask
                .execute(req.body)
                .catch(e => error = e)
    }

    if (error) res.send(error)
    else res.send(result)
})

module.exports = router;
