import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrashAlt, FaSearch } from 'react-icons/fa';
import AddStoreForm from './forms/store/AddStoreForm'; // Adjust the import path as needed
import UpdateStoreForm from './forms/store/UpdateStoreForm'; // Adjust the import path as needed

const Stores = () => {
    const [stores, setStores] = useState([]);
    const [showAddStoreForm, setShowAddStoreForm] = useState(false);
    const [editingStore, setEditingStore] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        // Fetch store data from the API
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/stores');
                if (!response.ok) {
                    throw new Error('Failed to fetch stores');
                }
                const data = await response.json();
                setStores(data);
            } catch (error) {
                console.error('Error fetching store data:', error);
            }
        };

        fetchData();
    }, []);

    const handleAddStore = async (newStore) => {
        try {
            const response = await fetch('http://localhost:3000/api/stores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStore),
            });

            if (!response.ok) {
                throw new Error('Failed to add store');
            }

            const addedStore = await response.json();
            setStores([...stores, addedStore]);
            setShowAddStoreForm(false);
        } catch (error) {
            console.error('Error adding store:', error);
        }
    };

    const handleUpdateStore = async (updatedStore) => {
        try {
            const response = await fetch(`http://localhost:3000/api/stores/${updatedStore._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedStore),
            });

            if (!response.ok) {
                throw new Error('Failed to update store');
            }

            const updatedStoreData = await response.json();
            setStores(stores.map(store => (store._id === updatedStoreData._id ? updatedStoreData : store)));
            setEditingStore(null);
        } catch (error) {
            console.error('Error updating store:', error);
        }
    };

    const handleRemoveStore = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/stores/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete store');
            }

            setStores(stores.filter(store => store._id !== id));
        } catch (error) {
            console.error('Error deleting store:', error);
        }
    };

    const handleEditClick = (store) => {
        setEditingStore(store);
    };

    const filteredStores = stores.filter(store =>
        store.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4 pt-20 bg-white rounded-md shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-500 text-lg font-semibold">Stores</h2>
                <button
                    onClick={() => setShowAddStoreForm(!showAddStoreForm)}
                    className="bg-green text-white font-semibold py-2 px-4 rounded flex items-center"
                >
                    <FaPlus className="mr-2" /> {showAddStoreForm ? 'Cancel' : 'Add Store'}
                </button>
            </div>
            {showAddStoreForm && <AddStoreForm onAddStore={handleAddStore} />}
            {editingStore && (
                <UpdateStoreForm
                    store={editingStore}
                    onUpdateStore={handleUpdateStore}
                    onCancel={() => setEditingStore(null)}
                />
            )}
            <div className="relative max-w-md w-full mb-4">
                <div className="absolute top-1 left-2 inline-flex items-center p-2">
                    <FaSearch className="text-gray-400" />
                </div>
                <input
                    className="w-full h-10 pl-10 pr-4 py-1 text-base placeholder-gray-500 border rounded-full focus:shadow-outline"
                    type="search"
                    placeholder="Search stores..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <table className="w-full table-auto text-sm">
                <thead>
                    <tr className="text-sm leading-normal">
                        <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Name</th>
                        <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Location</th>
                        <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-center">Contact Number</th>
                        <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStores.length > 0 ? (
                        filteredStores.map(store => (
                            <tr key={store._id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b border-gray-200">{store.name}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{store.location}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{store.contactNumber}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-center">
                                    <button
                                        onClick={() => handleEditClick(store)}
                                        className="text-blue-500 hover:text-blue-700 mr-2"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleRemoveStore(store._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="py-2 px-4 text-center text-gray-500">No stores found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Stores;
