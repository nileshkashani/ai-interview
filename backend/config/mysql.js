const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
          'railway',
          'root',
          'JSJFRfMpKmIFHGZEtOBCPMtPJQdfmWIR',
          {
                      host: 'caboose.proxy.rlwy.net',
                      port: Number('33504'),
                      dialect: 'mysql',
                      logging: false,
                      dialectOptions: {
                                    ssl: {
                                                    require: true,
                                                    rejectUnauthorized: false
                                    }
                      }
          }
)

module.exports = sequelize
