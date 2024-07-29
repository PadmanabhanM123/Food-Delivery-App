const express = require('express');
const router = express.Router();
const createOrderPdf = require('../utils/createOrderPdf');
const path = require('path');
const fs = require('fs');

router.post('/place-order', async (req, res) => {
  try {
    const order = req.body;

    // Generate PDF
    const filePath = path.join(__dirname, `../pdfs/order_${order.id}.pdf`);
    createOrderPdf(order, filePath);

    res.status(200).json({ message: 'Order placed successfully, PDF generated' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
