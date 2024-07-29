const express = require('express');
const router = express.Router();
const { Order, FoodItem } = require('../models'); // Adjust based on your models

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { userId, items, totalPrice, address, phoneNumber } = req.body;

    // Create the order
    const order = await Order.create({
      userId,
      totalPrice,
      address,
      phoneNumber
    });

    // Add items to the order
    for (const item of items) {
      await order.addFoodItem(item.id, { through: { quantity: item.quantity } });
    }

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: FoodItem,
        through: { attributes: ['quantity'] }
      }
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get an order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: {
        model: FoodItem,
        through: { attributes: ['quantity'] }
      }
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update an order (e.g., status update)
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(400).json({ error: error.message });
  }
});

// Delete an order
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
