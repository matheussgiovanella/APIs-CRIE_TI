const { Op } = require('sequelize');
const EventoModel = require('../models/Evento.js');
const axios = require('axios');

class EventoController {

    index = async (req, res, next) => {
        const params = req.query;
        const limit = params.limit || 100;
        const page = params.page || 1;
        const offset = (page - 1) * limit;
        const sort = params.sort || 'id';
        const order = params.order || 'ASC';
        const where = {};

        if (params.titulo) {
            where.titulo = {
                [Op.iLike]: `%${params.titulo}%`
            };
        }
        if (params.data) {
            where.dataHoraInicio = params.data
        }
        if (params.modalidade) {
            where.modalidade = {
                [Op.iLike]: `%${params.modalidade}%`
            }
        }
        if (params.local) {
            where.local = {
                [Op.iLike]: `%${params.local}%`
            }
        }
        if (params.valorIngresso) {
            where.valorIngresso = params.valorIngresso;
        }
        res.json(await EventoModel.findAll({
            where: where,
            limit: limit,
            offset: offset,
            order: [[sort, order]]
        }));
    }
    create = async (req, res, next) => {
        try {
            const data = await this._validateData(req.body);
            const evento = await EventoModel.create(data);
            res.json(evento);
        } catch (error) {

        }
    }
    _validateData = async (data) => {
        const attributes = [
            'titulo',
            'dataHoraInicio',
            'dataHoraFim',
            'modalidade'
        ];
        
        for (const attribute of attributes) {
            if (!data[attribute]) {
                throw new Error(`The attribute "${attribute}" is required.`);
            }
        }

        const date = data[`dataHoraInicio`].split(' ')[0];
        const year = date.split('-')[0];
        
        let feriados = await axios.get(`https://brasilapi.com.br/api/feriados/v1/${year}`);
        feriados = feriados.data;

        for (let i = 0; i < feriados.length; i++) {
            
            if (feriados[i].date === date) {
                data.feriado = true;
            } else {
                data.feriado = false;
            }
        }

        return data;
    }
    show = async (req, res, next) => {
        res.json(await EventoModel.findByPk(req.params.eventoId));
    }
    update = async (req, res, next) => {
        try {
            const id = req.params.eventoId;
            const data = await this._validateData(req.body, id);
            await EventoModel.update(data, {
                where: {
                    id: id
                }
            })
            res.json(await EventoModel.findByPk(id));
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    delete = async (req, res, next) => {
        await EventoModel.destroy({
            where: {
                id: req.params.eventoId
            }
        });
        res.json({});
    }
}

module.exports = new EventoController();