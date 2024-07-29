
const sequelize = require('../database');
const Restaurant = require('./restaurant');
const FoodItem = require('./foodItem');
const RestaurantFood=require('./RestaurantFood')

// Define associations
Restaurant.belongsToMany(FoodItem, { through: 'RestaurantFood',foreignKey: 'restaurantId' });
FoodItem.belongsToMany(Restaurant, { through: 'RestaurantFood', foreignKey: 'foodItemId'});

module.exports = {
  sequelize,
  Restaurant,
  FoodItem,
  RestaurantFood,
};

