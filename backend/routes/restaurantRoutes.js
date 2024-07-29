// src/routes/restaurantRoutes.js
const express = require('express');
const router = express.Router();
// const {Restaurant,FoodItem}=require('../models')
const Restaurant = require('../models/restaurant');
const FoodItem = require('../models/foodItem')

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    console.log('Fetched restaurants:', restaurants); // Add logging
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

// Add a new restaurant
router.post('/', async (req, res) => {
  const { name, image, rating, openingHours, closingHours } = req.body;

  try {
    const newRestaurant = await Restaurant.create({ name, image, rating, openingHours, closingHours });
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create restaurant' });
  }
});

// Update a restaurant
router.put('/:id', async (req, res) => {
  
  const { name, image, rating, openingHours, closingHours } = req.body;

  try {
    const restaurant = await Restaurant.findByPk(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    restaurant.name = name || restaurant.name;
    restaurant.image = image || restaurant.image;
    restaurant.rating = rating || restaurant.rating;
    restaurant.openingHours = openingHours || restaurant.openingHours;
    restaurant.closingHours = closingHours || restaurant.closingHours;

    await restaurant.save();
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update restaurant' });
  }
});

// Delete a restaurant
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findByPk(id);

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    await restaurant.destroy();
    res.status(200).json({ message: 'Restaurant deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete restaurant' });
  }
});

// Endpoint to get restaurants by food item
router.get('/food/:foodItemId/restaurants', async (req, res) => {
  const { foodItemId } = req.params;
  
  try {
    const foodItem = await FoodItem.findByPk(foodItemId, {
      include: {
        model: Restaurant,
        through: { attributes: [] }
      }
    });

    if (!foodItem) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    res.json(foodItem.Restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  // Get food items by restaurant ID
router.get('/:restaurantId/food-items', async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const restaurant = await Restaurant.findByPk(restaurantId, {
      include: {
        model: FoodItem,
        through: {
          attributes: [] // exclude join table attributes from result
        },
        attributes: ['id','name', 'price', 'image']
      }
    });
    console.log('Fetched restaurant:', restaurant)

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    console.log('Fetched food items:', restaurant.FoodItems);

    res.status(200).json(restaurant.FoodItems);
  } catch (error) {
    console.error('Error fetching food items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findByPk(id, {
      include: {
        model: FoodItem,
        through: { attributes: [] }
      }
    });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
