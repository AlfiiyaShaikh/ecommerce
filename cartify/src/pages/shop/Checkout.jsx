import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import stripe_publish_key from '../../info';

const stripePromise = loadStripe(stripe_publish_key);

const Checkout = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const totalAmount = parseFloat(queryParams.get('totalAmount') || '0').toFixed(2);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:3000/api/charge', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    paymentMethodId: data.paymentMethodId,
                    amount: totalAmount * 100,
                    email,
                }),
            });

            const result = await response.json();
            console.log('Charge response:', result);

            if (result.success) {
                // Navigate to confirmation page with email and total amount in state
                navigate('/confirmation', { state: { email, totalAmount } });
            } else {
                console.error('Payment failed:', result.error);
            }
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <div className="p-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', { required: 'Name is required' })}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: 'Email is required' })}
                            className="w-full p-2 border border-gray-300 rounded"
                            onChange={handleEmail}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <p>Total amount: <span>&#8377;</span> {totalAmount}</p>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                            totalAmount={totalAmount}
                            onSubmit={(paymentMethodId) => onSubmit({ paymentMethodId })}
                        />
                    </Elements>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
