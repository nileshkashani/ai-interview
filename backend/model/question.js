const {DataTypes} = require('sequelize');
const sequelize = require('../config/mysql');

const Question = sequelize.define('Question', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    interview_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})
module.exports = Question;