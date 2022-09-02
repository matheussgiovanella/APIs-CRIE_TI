const router = require('express').Router();
const eventos = require('./eventos.js');

router.use(eventos);

module.exports = router;
