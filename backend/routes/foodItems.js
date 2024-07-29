const express = require('express');
const router = express.Router();
const FoodItem = require('../models/foodItem');

// Get all food items
router.get('/', async (req, res) => {
  try {
    const foodItems = await FoodItem.findAll();
    console.log('Fetched food items:', foodItems); // Add logging
    res.status(200).json(foodItems);
  } catch (error) {
    console.error('Error fetching food items:', error);
    res.status(500).json({ error: 'Failed to fetch food items' });
  }
});

// Create a new food item
router.post('/add', async (req, res) => {
  const { name, image,price } = req.body;
  try {
    const newFoodItem = await FoodItem.create({ name, image,price });
    res.status(201).json({ message: 'Food item created successfully', foodItem: newFoodItem })
  } catch (error) {
    res.status(500).json({ error: 'Error creating food item' });
  }
});

// Get a single food item by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const foodItem = await FoodItem.findByPk(id);
    if (foodItem) {
      res.status(200).json(foodItem);
    } else {
      res.status(404).json({ error: 'Food item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching food item' });
  }
});

// Update a food item
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, image } = req.body;
  try {
    const foodItem = await FoodItem.findByPk(id);
    if (foodItem) {
      await foodItem.update({ name, image });
      res.status(200).json(foodItem);
    } else {
      res.status(404).json({ error: 'Food item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating food item' });
  }
});

// Delete a food item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const foodItem = await FoodItem.findByPk(id);
    if (foodItem) {
      await foodItem.destroy();
      res.status(200).json({ message: 'Food item deleted' });
    } else {
      res.status(404).json({ error: 'Food item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting food item' });
  }
});

module.exports = router;
