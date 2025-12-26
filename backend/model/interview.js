const { DataTypes } = require('sequelize')
const sequelize = require('../config/mysql')

const Interview = sequelize.define('Interview', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  topic: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = Interview
