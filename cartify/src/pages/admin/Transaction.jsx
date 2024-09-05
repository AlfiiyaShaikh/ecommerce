import React, { useState, useEffect } from 'react';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/transactions'); // Updated to use API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transaction data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-4 pt-20 bg-white rounded-md shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-500 text-lg font-semibold">Transactions</h2>
            </div>
            <table className="w-full table-auto text-sm">
                <thead>
                    <tr className="text-sm leading-normal">
                        <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Transaction ID</th>
                        <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Name</th>
                        <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Email</th>
                        <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Amount</th>
                        <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map(transaction => (
                            transaction._id ? ( // Ensure _id exists before rendering
                                <tr key={transaction._id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b border-gray-200">{transaction._id}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{transaction.name}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{transaction.email}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">₹ {transaction.amount.toFixed(2)}</td> {/* Ensure amount is a number */}
                                    <td className="py-2 px-4 border-b border-gray-200">{new Date(transaction.date).toLocaleDateString()}</td>
                                </tr>
                            ) : null // Skip rendering if _id is not present
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="py-2 px-4 text-center text-gray-500">No transactions found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Transactions;
