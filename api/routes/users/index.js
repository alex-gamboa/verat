let router = require('express').Router();
const config = require('../../config')
const fs = require('fs')
const formidable = require('formidable')
const repo = require('../../modules/db/userRepo')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const addUser = require('../../modules/usecases/user/addUser')
const updateUser = require('../../modules/usecases/user/updateUser')
const getUsers = require('../../modules/usecases/user/getUsers')
const getUserbyUsername = require('../../modules/usecases/user/getUsers')
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

router.get('/agents', async (req, res) => {
    const error = null;

    const result = await repo
                .getAgents()
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

router.post('/auth', async (req, res) => {

    let user = await repo.getUserByUsername(req.body.username)

    if(!user) return res.status(400).send('El usuario no existe')

    if(!user.password) user.password = ''

    let valid = await bcrypt.compare(req.body.password, user.password)

    if(!valid) return res.status(400).send('Invalid password')

    const token =
        jwt.sign({
            _id: user._id,
            type: user.type,
            lang: (user.language) ? user.language : ''
        }, config.jwtPrivate, { expiresIn: 86400 })

    res
        .status(200).
        send({
            auth: true,
            token: token,
            user: {
                _id: user._id,
                type: user.type,
                name: user.fullName,
                lang: (user.language) ? user.language : ''
            }
        })
})

module.exports = router;
