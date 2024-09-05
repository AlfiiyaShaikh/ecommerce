import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to replace this with your own public key from Stripe
const stripePromise = loadStripe('pk_test_51PuzSDP4tvYnpvbXUKCVXJOqjZddTMjq3AzsHBAngYgc3xclUPvzscyIURdyxQHYyMU41CNjYHFtT3DDAIPSyVSS00iURXZ6uR');

const StripeProvider = ({ children }) => (
    <Elements stripe={stripePromise}>
        {children}
    </Elements>
);

export default StripeProvider;