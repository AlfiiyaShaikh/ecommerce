import React, { useState } from 'react';

const AddUserForm = ({ onAddUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!name || !email || !password) {
            setError('All fields are required.');
            return;
        }

        const newUser = {
            name,
            email,
            password,
            role
        };

        try {
            // Log the request data for debugging
            console.log('Sending request with data:', newUser);

            // Send the request
            await onAddUser(newUser);

            // Handle success
            setSuccess('User added successfully.');
            setError('');
            reset();
        } catch (err) {
            // Log the error for debugging
            console.error('Error creating user:', err);

            // Handle error
            setError('Failed to add user.');
            setSuccess('');
        }
    };


    const reset = () => {
        setName('');
        setEmail('');
        setPassword('');
        setRole('User');
    };

    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <h2 className="text-gray-500 text-lg font-semibold mb-4">Add New User</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
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
                    <label className="block text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-10 px-4 border rounded-md"
                        placeholder="Enter user password"
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
                        <option value="Store">Store</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-green text-white font-semibold py-2 px-4 rounded"
                >
                    Add User
                </button>
            </form>
        </div>
    );
};

export default AddUserForm;
