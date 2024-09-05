const express = require('express');
const Store = require('../models/store');
const router = express.Router();

// POST /api/stores - Create a new store
router.post('/stores', async (req, res) => {
    try {
        const { name, location, contactNumber } = req.body;
        const store = new Store({ name, location, contactNumber });
        await store.save();
        res.status(201).json(store);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /api/stores - Get all stores
router.get('/stores', async (req, res) => {
    try {
        const stores = await Store.find();
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/stores/:id - Get a store by ID
router.get('/stores/:id', async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);
        if (!store) {
            return res.status(404).json({ error: 'Store not found' });
        }
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/stores/:id - Update a store by ID
router.put('/stores/:id', async (req, res) => {
    try {
        const { name, location, contactNumber } = req.body;
        const store = await Store.findByIdAndUpdate(req.params.id, { name, location, contactNumber }, { new: true });
        if (!store) {
            return res.status(404).json({ error: 'Store not found' });
        }
        res.status(200).json(store);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /api/stores/:id - Delete a store by ID
router.delete('/stores/:id', async (req, res) => {
    try {
        const store = await Store.findByIdAndDelete(req.params.id);
        if (!store) {
            return res.status(404).json({ error: 'Store not found' });
        }
        res.status(200).json({ message: 'Store deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
