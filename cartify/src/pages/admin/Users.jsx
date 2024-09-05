import React, { useState, useEffect } from 'react';
import { FaSearch, FaUserEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import AddUserForm from './forms/user/AddUserForm';
import UpdateUserForm from './forms/user/UpdateUserForm';

const Users = () => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/users');
                const data = await response.json();

                if (Array.isArray(data)) {
                    // Include both User and Admin roles
                    const filteredUsers = data.filter(user => user.role === 'User' || user.role === 'Admin');
                    setUsers(filteredUsers);
                } else {
                    console.error('Unexpected response format:', data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleRemoveUser = async (id) => {
        try {
            await fetch(`http://localhost:3000/api/users/${id}`, {
                method: 'DELETE',
            });
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error('Error removing user:', error);
        }
    };

    const handleUpdateUser = async (updatedUser) => {
        try {
            await fetch(`http://localhost:3000/api/users/${updatedUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });
            setUsers(users.map(user => (user._id === updatedUser._id ? updatedUser : user)));
            setEditingUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleAddUser = async (user) => {
        try {
            const response = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
                credentials: 'include', // Include credentials if needed
            });

            if (!response.ok) {
                throw new Error('Failed to add user.'); // Throw error if response is not OK
            }

            return await response.json();
        } catch (error) {
            throw error; // Re-throw error to be caught by the form component
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
    };

    return (
        <div className="p-4 pt-20 bg-white rounded-md shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-500 text-lg font-semibold">Users</h2>
                <button
                    onClick={() => setShowAddUserForm(!showAddUserForm)}
                    className="bg-green text-white font-semibold py-2 px-4 rounded flex items-center"
                >
                    <FaPlus className="mr-2" /> {showAddUserForm ? 'Cancel' : 'Add User'}
                </button>
            </div>
            {showAddUserForm && <AddUserForm onAddUser={handleAddUser} />}
            {editingUser && (
                <UpdateUserForm
                    user={editingUser}
                    onUpdateUser={handleUpdateUser}
                    onCancel={() => setEditingUser(null)}
                />
            )}
            <div className="relative max-w-md w-full mb-4">
                <div className="absolute top-1 left-2 inline-flex items-center p-2">
                    <FaSearch className="text-gray-400" />
                </div>
                <input
                    className="w-full h-10 pl-10 pr-4 py-1 text-base placeholder-gray-500 border rounded-full focus:shadow-outline"
                    type="search"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <table className="w-full table-auto text-sm">
                <thead>
                    <tr className="text-sm leading-normal">
                        <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Name</th>
                        <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Email</th>
                        <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Role</th>
                        <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <tr key={user._id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b border-gray-200">{user.name}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{user.role}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-center">
                                    <button
                                        onClick={() => handleEditClick(user)}
                                        className="text-blue-500 hover:text-blue-700 mr-2"
                                    >
                                        <FaUserEdit />
                                    </button>
                                    <button
                                        onClick={() => handleRemoveUser(user._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="py-2 px-4 text-center text-gray-500">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
