const express = require('express');
const {
    getAllOrders,
    createOrder,
    updateOrderStatus,
} = require('../controllers/orderController');

const router = express.Router();

// 📥 GET all orders (for admin dashboard)
router.get('/', getAllOrders);

// 🛒 POST a new order (when user places an order)
router.post('/', createOrder);

// 🔄 UPDATE status of an order (admin updates status)
router.put('/:id', updateOrderStatus);

// 🧾 GET all orders for a specific user (user order history)
router.get('/user/:userId', async (req, res) => {
  try {
    const Order = require('../models/Order');
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user orders' });
  }
});

module.exports = router;