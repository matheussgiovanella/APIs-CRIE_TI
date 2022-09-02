const router = require('express').Router();
const EventoModel = require('../models/Evento.js');
const eventoController = require('../EventosController/EventoController.js');

const validateId = async (req, res, next) => {
    const evento = await EventoModel.findByPk(req.params.eventoId);
    if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado!' });
    }
    next();
}

router.get('/eventos', eventoController.index);
router.get('/eventos/:eventoId', validateId, eventoController.show);
router.post('/eventos', eventoController.create);
router.put('/eventos/:eventoId', validateId, eventoController.update);
router.delete('/eventos/:eventoId', validateId, eventoController.delete);

module.exports = router;