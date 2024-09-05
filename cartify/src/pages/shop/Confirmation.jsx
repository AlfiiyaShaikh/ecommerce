import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Confirmation = () => {
    const [transactionId, setTransactionId] = useState(null);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const userEmail = location.state?.email; // Assuming the email was passed from the previous page

    useEffect(() => {
        const fetchTransactionId = async () => {
            try {
                // Fetch all transactions and filter by the user's email
                const response = await fetch('http://localhost:3000/api/transactions');
                const data = await response.json();

                // Find the transaction that matches the user's email
                const userTransaction = data.find(transaction => transaction.email === userEmail);

                if (userTransaction) {
                    setTransactionId(userTransaction._id);
                    setEmail(userTransaction.email); // Save the email for display
                } else {
                    console.error('No transaction found for the email:', userEmail);
                }
            } catch (error) {
                console.error('Error fetching transaction ID:', error);
            }
        };

        if (userEmail) {
            fetchTransactionId();
        } else {
            console.error('No email provided');
        }
    }, [userEmail]);

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-4">Thank You for Your Purchase!</h1>
            <p className="text-lg">Your order has been placed successfully. We will send you a confirmation email on <b>{email} </b>shortly.</p>

            {transactionId ? (
                <>
                    <p className="text-lg mt-4">Transaction ID: <span className="font-semibold">{transactionId}</span></p>

                </>
            ) : (
                <p className="text-lg mt-4">Fetching transaction details...</p>
            )}

            <div className="mt-8">
                <a href="/products" className="link link-hover text-blue-500">Continue Shopping ❤️</a>
            </div>

            <div className="mt-4">
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Go to Homepage
                </button>
            </div>
        </div>
    );
};

export default Confirmation;
