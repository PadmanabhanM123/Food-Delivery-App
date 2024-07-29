const  {Sequelize } = require('sequelize');

const sequelize = new Sequelize('food_delivery', 'postgres', 'qwert@123', {
  host: 'localhost',
  dialect: 'postgres',
  // logging:false,
});

module.exports = sequelize

