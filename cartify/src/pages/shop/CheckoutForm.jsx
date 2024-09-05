import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ totalAmount, onSubmit }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            console.log(email)
            console.log('[error]', error);
            // Handle error (show to user)
        } else {
            onSubmit(paymentMethod.id);
        }
    };

    return (
        <div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-1">Payment Method</label>
                <CardElement className="p-2 border border-gray-300 rounded" />
            </div>
            <button
                type="submit" onClick={handleSubmit}
                className="bg-green text-white py-2 px-4 rounded"
                disabled={!stripe}
            >
                Place Order
            </button>
        </div>
    );
};

export default CheckoutForm;
