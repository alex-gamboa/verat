var router = require('express').Router();

router.get('/', async (req, res) => {

    let error = null
    if (error) res.send(error)
    else res.send(['Disponible','Asignado','Reparación', 'Scrap', 'Baja'])
})

module.exports = router;
