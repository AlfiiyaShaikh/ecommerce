import React, { useState, useEffect } from 'react';

const UpdateUserForm = ({ user, onUpdateUser, onCancel }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email) {
            setError('All fields are required.');
            return;
        }

        const updatedUser = { ...user, name, email, role };

        await onUpdateUser(updatedUser)
    };

    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <h2 className="text-gray-500 text-lg font-semibold mb-4">Update User</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-10 px-4 border rounded-md"
                        placeholder="Enter user name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-10 px-4 border rounded-md"
                        placeholder="Enter user email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full h-10 px-4 border rounded-md"
                    >
                        <option value="User">User</option>
                        <option value="User">Store</option>
                        <option value="User">Admin</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-green text-white font-semibold py-2 px-4 rounded mr-2"
                >
                    Update User
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

export default UpdateUserForm;
