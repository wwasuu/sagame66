const sequelize = require('sequelize')
const CONFIG = require('../../config')

const sequelizeConnection = new sequelize(CONFIG.DB.NAME, CONFIG.DB.USERNAME, CONFIG.DB.PASSWORD, {
    host: CONFIG.DB.HOST,
    dialect: 'mysql',
    logging: false,
    timezone: '+07:00',
  })

module.exports = {
  sequelizeConnection    
}