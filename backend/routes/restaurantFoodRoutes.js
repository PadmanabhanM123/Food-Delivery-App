// src/routes/restaurantFoodRoutes.js
const express = require('express');
const router = express.Router();
// const RestaurantFood = require('../models/RestaurantFood');
// const Restaurant = require('../models/restaurant');
// const FoodItem = require('../models/foodItem')
const { Restaurant, FoodItem, RestaurantFood } = require('../models');

// Add relationship between restaurant and food item
router.post('/add', async (req, res) => {
  const { restaurantIds, foodItemId } = req.body;
try {
  // Validate existence of the food item ID
  const foodItem = await FoodItem.findByPk(foodItemId);
  if (!foodItem) {
    return res.status(404).json({ error: 'FoodItem not found' });
  }

  // Validate existence of each restaurant ID
  for (const restaurantId of restaurantIds) {
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: `Restaurant with ID ${restaurantId} not found` });
    }

    // Create entry in RestaurantFood
    await RestaurantFood.create({ restaurantId, foodItemId });
  }

  res.status(201).json({ message: 'Relationships added successfully' });
} catch (error) {
  console.error('Error adding relationships:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
})

module.exports = router;
