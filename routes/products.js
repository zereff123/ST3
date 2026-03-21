const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');

// Create product and corresponding inventory
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const product = new Product({ name, description });
    await product.save();

    const inventory = new Inventory({ product: product._id });
    await inventory.save();

    res.status(201).json({ product, inventory });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;