// src/models/restaurant.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Restaurant = sequelize.define('Restaurant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 5,
    },
  },
  openingHours: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  closingHours: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
    tableName:'Restaurant',
    timestamps:false,
});

// Restaurant.associate = (models) => {
//   Restaurant.belongsToMany(models.FoodItem, { through: 'RestaurantFood' });
// };


// Restaurant.belongsToMany(FoodItem, { through: RestaurantFood });
// FoodItem.belongsToMany(Restaurant, { through: RestaurantFood });

module.exports = Restaurant;
