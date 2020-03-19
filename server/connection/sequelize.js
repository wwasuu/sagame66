const sequelize = require('sequelize')

const sequelizeConnection = new sequelize('sagame66', 'root', 'b15d873e209b5c8b2f7ec7c5dd4059c0926d8e539ed5e610', {
    host: '165.22.109.7',
    dialect: 'mysql',
    logging: false,
    timezone: '+07:00',
  })

module.exports = {
  sequelizeConnection    
}