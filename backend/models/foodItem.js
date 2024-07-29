const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust the path to your database configuration
const FoodItem = sequelize.define('FoodItem', {
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
    type: DataTypes.STRING, // URL or path to the image
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,

  },
}, {
    tableName:'FoodItem',
    timestamps: false,
});
// FoodItem.associate = (models) => {
//   FoodItem.belongsToMany(models.Restaurant, { through:'RestaurantFood' });
// };

// FoodItem.belongsToMany(Restaurant, { through: RestaurantFood });
// Restaurant.belongsToMany(FoodItem, { through: RestaurantFood });

module.exports = FoodItem;
