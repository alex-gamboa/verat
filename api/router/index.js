var router = require('express').Router();

router.use('/assets/category', require('./assets/category'));
router.use('/assets/brand', require('./assets/brand'));
router.use('/assets/kind', require('./assets/kind'));
router.use('/assets/area', require('./assets/area'));
router.use('/assets/state', require('./assets/state'));
router.use('/assets/log', require('./assets/log'));
router.use('/assets', require('./assets'));
router.use('/users', require('./users'));
router.use('/tickets', require('./tickets'));
router.use('/consumables', require('./consumables'));

module.exports = router;
