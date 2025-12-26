const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('interview_app', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
})

module.exports = sequelize
