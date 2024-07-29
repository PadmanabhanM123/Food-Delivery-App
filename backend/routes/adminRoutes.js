// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { User, FoodItem, Restaurant, Order } = require('../models');

// User Management
router.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.delete('/users/:id', async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

// Food Item Management
router.get('/food-items', async (req, res) => {
  const foodItems = await FoodItem.findAll();
  res.json(foodItems);
});

router.post('/food-items', async (req, res) => {
  const newFoodItem = await FoodItem.create(req.body);
  res.json(newFoodItem);
});

router.put('/food-items/:id', async (req, res) => {
  const updatedFoodItem = await FoodItem.update(req.body, { where: { id: req.params.id } });
  res.json(updatedFoodItem);
});

router.delete('/food-items/:id', async (req, res) => {
  await FoodItem.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

// Restaurant Management
router.get('/restaurants', async (req, res) => {
  const restaurants = await Restaurant.findAll();
  res.json(restaurants);
});

router.post('/restaurants', async (req, res) => {
  const newRestaurant = await Restaurant.create(req.body);
  res.json(newRestaurant);
});

router.put('/restaurants/:id', async (req, res) => {
  const updatedRestaurant = await Restaurant.update(req.body, { where: { id: req.params.id } });
  res.json(updatedRestaurant);
});

router.delete('/restaurants/:id', async (req, res) => {
  await Restaurant.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

// Order Management
router.get('/orders', async (req, res) => {
  const orders = await Order.findAll();
  res.json(orders);
});

router.put('/orders/:id', async (req, res) => {
  const updatedOrder = await Order.update(req.body, { where: { id: req.params.id } });
  res.json(updatedOrder);
});

module.exports = router;
