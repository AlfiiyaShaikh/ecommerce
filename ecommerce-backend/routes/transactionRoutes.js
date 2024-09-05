const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction'); // Import the Transaction model

// Fetch all transactions
router.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('userId', 'name email');
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error: error.message });
    }
});

// Check if a user has completed a transaction
router.get('/transactions/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch transactions for the given userId
        const transactions = await Transaction.find({ userId: userId });

        // Check if there are any transactions for the user
        if (transactions.length > 0) {
            return res.json({ hasTransaction: true, transactions });
        } else {
            return res.json({ hasTransaction: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error checking transaction status', error: error.message });
    }
});

module.exports = router;
