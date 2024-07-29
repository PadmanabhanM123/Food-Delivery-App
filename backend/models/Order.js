const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Update the path as needed

const Order = sequelize.define('Order', {
  // Define the attributes for the Order model
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Assuming you have a User model
      key: 'id',
    },
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Restaurants', // Assuming you have a Restaurant model
      key: 'id',
    },
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  Address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add more fields as necessary
});

module.exports = Order;
