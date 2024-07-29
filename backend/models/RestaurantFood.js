// src/models/RestaurantFood.js
const { DataTypes } = require('sequelize');
const  sequelize  = require('../database'); // Adjust path as needed

const RestaurantFood = sequelize.define('RestaurantFood', {
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Restaurant',
      key: 'id',
    },
  },
  foodItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'FoodItem',
      key: 'id',
    },
  },
}
, {
  tableName: 'RestaurantFood',
  timestamps: false,
});

module.exports = RestaurantFood;
