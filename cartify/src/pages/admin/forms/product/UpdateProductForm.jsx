import React, { useState } from 'react';

const UpdateProductForm = ({ product, onUpdateProduct, onCancel }) => {
    const [name, setName] = useState(product.name);
    const [category, setCategory] = useState(product.category);
    const [price, setPrice] = useState(product.price);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate inputs
        if (!name || !category || !price) {
            setError('All fields are required.');
            return;
        }

        if (isNaN(price) || parseFloat(price) <= 0) {
            setError('Price must be a positive number.');
            return;
        }

        // Create updated product object
        const updatedProduct = { ...product, name, category, price: parseFloat(price) };

        // Call the parent callback function to update the product
        onUpdateProduct(updatedProduct);

        // Clear error
        setError('');
    };

    return (
        <div className="p-4 bg-white rounded-md shadow-md mb-4">
            <h2 className="text-gray-500 text-lg font-semibold mb-4">Update Product</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-10 px-4 border rounded-md"
                        placeholder="Enter product name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full h-10 px-4 border rounded-md"
                        placeholder="Enter category"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full h-10 px-4 border rounded-md"
                        placeholder="Enter price"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green text-white font-semibold py-2 px-4 rounded mr-2"
                >
                    Update Product
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default UpdateProductForm;
