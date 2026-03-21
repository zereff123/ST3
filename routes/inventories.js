const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// Get all inventories with product join
router.get('/', async (req, res) => {
  try {
    const inventories = await Inventory.find().populate('product');
    res.json(inventories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get inventory by ID with product join
router.get('/:id', async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id).populate('product');
    if (!inventory) return res.status(404).json({ error: 'Inventory not found' });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add stock
router.post('/add-stock', async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const inventory = await Inventory.findOne({ product });
    if (!inventory) return res.status(404).json({ error: 'Inventory not found' });
    inventory.stock += quantity;
    await inventory.save();
    res.json(inventory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Remove stock
router.post('/remove-stock', async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const inventory = await Inventory.findOne({ product });
    if (!inventory) return res.status(404).json({ error: 'Inventory not found' });
    if (inventory.stock < quantity) return res.status(400).json({ error: 'Insufficient stock' });
    inventory.stock -= quantity;
    await inventory.save();
    res.json(inventory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Reservation
router.post('/reservation', async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const inventory = await Inventory.findOne({ product });
    if (!inventory) return res.status(404).json({ error: 'Inventory not found' });
    if (inventory.stock < quantity) return res.status(400).json({ error: 'Insufficient stock' });
    inventory.stock -= quantity;
    inventory.reserved += quantity;
    await inventory.save();
    res.json(inventory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Sold
router.post('/sold', async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const inventory = await Inventory.findOne({ product });
    if (!inventory) return res.status(404).json({ error: 'Inventory not found' });
    if (inventory.reserved < quantity) return res.status(400).json({ error: 'Insufficient reserved' });
    inventory.reserved -= quantity;
    inventory.soldCount += quantity;
    await inventory.save();
    res.json(inventory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;