import React, { useState } from 'react';

const UpdateStoreForm = ({ store, onUpdateStore, onCancel }) => {
    const [name, setName] = useState(store.name);
    const [location, setLocation] = useState(store.location);
    const [contactNumber, setContactNumber] = useState(store.contactNumber);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate inputs
        if (!name || !location || !contactNumber) {
            setError('All fields are required.');
            return;
        }

        // Create updated store object
        const updatedStore = { ...store, name, location, contactNumber };

        // Call the parent callback function to update the store
        onUpdateStore(updatedStore);

        // Clear error
        setError('');
    };

    return (
        <div className="p-4 bg-white rounded-md shadow-md mb-4">
            <h2 className="text-gray-500 text-lg font-semibold mb-4">Update Store</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-10 px-4 border rounded-md"
                        placeholder="Enter store name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full h-10 px-4 border rounded-md"
                        placeholder="Enter store location"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Contact Number</label>
                    <input
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        className="w-full h-10 px-4 border rounded-md"
                        placeholder="Enter store contact number"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green text-white font-semibold py-2 px-4 rounded mr-2"
                >
                    Update Store
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

export default UpdateStoreForm
