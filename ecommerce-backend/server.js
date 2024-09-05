const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const User = require('./models/user'); // Import the User model
const Transaction = require('./models/transaction')
const transactionRoutes = require('./routes/transactionRoutes');

dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_ORIGIN, // Set this to your client origin (e.g., 'http://localhost:5173')
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize()); // Initialize Passport.js

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Import and configure Passport.js
require('./config/passport'); // Make sure this file configures Passport.js

// Import routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const storeRoutes = require('./routes/storeRoutes');
const cartRoutes = require('./routes/cartRoutes');

const Stripe = require('stripe');
const stripe = Stripe('sk_test_51PuzSDP4tvYnpvbXgF15QuAcs4iMVqmxFmritBWfy1iVNKn3TdA4ysA7Xv5uPAMlHNiBCySXmo2BrlkHZkRVsq3W00SSQ7lPHu');


app.use(express.json());

app.post('/api/charge', async (req, res) => {
    const { paymentMethodId, amount, email } = req.body;


    try {
        // Fetch the user based on the email provided
        const user = await User.findOne({ email });


        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Create the payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'inr',
            payment_method: paymentMethodId,
            confirm: true,
            return_url: 'https://localhost:3000/confirmation'
        });

        // Extract card details (last 4 digits) from payment method
        const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
        const cardLast4 = paymentMethod.card.last4;

        // Create a new transaction
        const transaction = new Transaction({
            userId: user._id,
            name: user.name,
            email: user.email,
            cardLast4: cardLast4,
            amount: amount / 100, // Convert amount from cents to currency units
        });

        // Save the transaction to the database
        await transaction.save();

        res.json({ success: true });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.json({ success: false, error: error.message });
    }
});



// Use routes
app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', storeRoutes);
app.use('/api', cartRoutes);

app.use('/api', transactionRoutes);


// Authentication routes
app.post('/api/auth/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, async (err, user, info) => {
        // if (err || !user) {
        //     return res.status(400).json({ message: info ? info.message : 'Login failed' });
        // }

        try {

            const dbUser = await User.findOne({ email: req.body.email });
            if (!dbUser) {
                return res.status(400).json({ message: 'User not found' });
            }

            // Assuming `user.token` is already generated; otherwise, generate it here
            const token = user.token;

            // Set the token in a cookie
            res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

            // Send the user data along with the role in the response
            res.json({
                message: 'Login successful',
                user: {
                    id: dbUser._id,
                    user: dbUser.name,
                    role: dbUser.role,

                }
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    })(req, res, next);
});



app.post('/api/auth/signup', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = new User({ name, email, password, role });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error); // Log error for debugging
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
});

// Test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
