const { DataTypes, Model } = require('sequelize');
const db = require('../db/index.js');

class Evento extends Model {

}

Evento.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dataHoraInicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dataHoraFim: {
        type: DataTypes.DATE,
        allowNull: false
    },
    modalidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    local: {
        type: DataTypes.STRING,
        allowNull: true
    },
    valorIngresso: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    numeroMinParticipantes: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    numeroMaxParticipantes: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    feriado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'Evento',
    tableName: 'eventos',
    timestamps: false
});

//Evento.sync({ force: true });

module.exports = Evento;