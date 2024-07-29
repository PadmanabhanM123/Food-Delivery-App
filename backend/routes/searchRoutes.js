// src/routes/searchRoutes.js
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { FoodItem, Restaurant } = require('../models');

router.get('/', async (req, res) => {
  const query = req.query.query;
  
  try {
    // Search for food items
    const foodItems = await FoodItem.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`
        }
      },
      include: {
        model: Restaurant,
        through: { attributes: [] }
      }
    });

    // Search for restaurants
    const restaurants = await Restaurant.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`
        }
      },
      include: {
        model: FoodItem,
        through: { attributes: [] },
        attributes:['id','name','image','price']
      }
    });

    res.json({ foodItems, restaurants });
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
