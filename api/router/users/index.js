let router = require('express').Router();
const config = require('../../config')
const fs = require('fs')
const formidable = require('formidable')

const addUser = require('../../modules/usecases/user/addUser')
const updateUser = require('../../modules/usecases/user/updateUser')
const getUsers = require('../../modules/usecases/user/getUsers')
const getUserDocuments = require('../../modules/usecases/user/getUserDocuments')
const addUserDocument = require('../../modules/usecases/user/addUserDocument')

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

    console.log(req.params);


    const result = await getUserDocuments
                .execute(req.params.id)
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

router.post('/documents/save', async (req, res) => {

    let form = new formidable.IncomingForm();
    let fileName

    form.parse(req);

    form.on('fileBegin', function (name, file){
        date = new Date()

        fileName = date.getTime() + '_' + file.name

        file.path = config.nodePublicPath + '\\' + fileName
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + fileName);
        return res.status(200).json({fileName: fileName})
    });

})

router.post('/documents', async (req, res) => {

    const error = null;

    const result = await addUserDocument
                .execute(req.body)
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)

})

router.post('/', async (req, res) => {

    const error = null;
    let user = req.body
    let result

    if(user._id){
        result =
            await
                updateUser
                .execute(user)
                .catch(e => error = e)
    }
    else {
        result =
            await
                addUser
                .execute(user)
                .catch(e => error = e)
    }

    if (error) res.send(error)
    else res.send(result)
})

module.exports = router;
