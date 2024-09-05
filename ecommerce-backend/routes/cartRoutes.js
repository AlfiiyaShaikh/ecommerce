const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');


// Get user's cart
router.get('/cart/:userId', async (req, res) => {
    const { userId } = req.params; // Extract userId from request parameters

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product'); // Populate product details

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        res.json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error); // Log error for debugging
        res.status(500).json({ error: "Error fetching cart" });
    }
});



// Add to cart
router.post('/cart/:userId', async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ user: req.params.userId });
        if (!cart) {
            cart = new Cart({ user: req.params.userId, items: [] });
        }
        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: "Error adding to cart" });
    }
});

// Update item quantity in cart
router.patch('/cart/:userId/:productId', async (req, res) => {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
        return res.status(400).json({ error: "Quantity must be greater than 0" });
    }

    try {
        const cart = await Cart.findOneAndUpdate(
            { user: userId, 'items.product': productId },
            { $set: { 'items.$.quantity': quantity } },
            { new: true }
        ).populate('items.product');

        if (!cart) {
            return res.status(404).json({ error: "Cart or item not found" });
        }


        res.json(cart);
    } catch (error) {
        console.error("Error updating quantity:", error);
        res.status(500).json({ error: "Error updating quantity" });
    }
});

// Delete item from cart
router.delete('/cart/:userId/:productId', async (req, res) => {
    const { userId, productId } = req.params;

    try {
        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            { $pull: { items: { product: productId } } },
            { new: true }
        ).populate('items.product');

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }


        res.json(cart);
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ error: "Error removing item from cart" });
    }
});

router.delete('/cart/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Remove the entire cart for the specified user
        const result = await Cart.deleteOne({ user: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Cart not found" });
        }

        // Respond with a success message
        res.json({ message: "Cart successfully deleted" });
    } catch (error) {
        console.error("Error removing cart:", error);
        res.status(500).json({ error: "Error removing cart" });
    }
});



module.exports = router;
