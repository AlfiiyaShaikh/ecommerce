// src/components/AdminNavbar.js
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaHome, FaFileAlt, FaUsers, FaStore, FaExchangeAlt, FaSignOutAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminNavbar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // To get current route

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login', { replace: true });
    };

    const showLogoutConfirmToast = () => {
        toast.info(
            <div>
                <p>You are about to log out. Are you sure?</p>
                <button
                    onClick={() => {
                        handleLogout();
                        toast.dismiss(); // Close the toast
                    }}
                    className="bg-green text-white px-2 py-1 rounded mr-2"
                >
                    Yes
                </button>
                <button
                    onClick={() => toast.dismiss()} // Close the toast
                    className="bg-red-500 text-white px-2 py-1 rounded"
                >
                    No
                </button>
            </div>,
            {
                autoClose: false, // Don't auto close
                closeButton: false, // Remove default close button
                className: "flex items-center space-x-2",
                style: { width: '300px' },
            }
        );
    };

    const isActive = (path) => location.pathname === path;

    return (
        <header className='fixed top-0 left-0 right-0 bg-primary z-10'>
            <div className="navbar xl:px-24">
                <div className="navbar-start">
                    <div className="dropdown">
                        <button
                            className="btn btn-green lg:hidden"
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                        >
                            <FaBars className="text-gray-500 text-lg" />
                        </button>
                        <ul
                            className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow ${isSidebarOpen ? 'block' : 'hidden'}`}
                        >
                            <li>
                                <Link
                                    to="/dashboard/"
                                    className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/dashboard/') ? 'bg-green text-white' : 'bg-white text-black'}`}
                                >
                                    <FaHome className="mr-2" /> Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/dashboard/products"
                                    className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/dashboard/products') ? 'bg-green text-white' : 'bg-white text-black'}`}
                                >
                                    <FaFileAlt className="mr-2" /> Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/dashboard/users"
                                    className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/dashboard/users') ? 'bg-green text-white' : 'bg-white text-black'}`}
                                >
                                    <FaUsers className="mr-2" /> Users
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/dashboard/stores"
                                    className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/dashboard/stores') ? 'bg-green text-white' : 'bg-white text-black'}`}
                                >
                                    <FaStore className="mr-2" /> Stores
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/dashboard/transactions"
                                    className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/dashboard/transactions') ? 'bg-green text-white' : 'bg-white text-black'}`}
                                >
                                    <FaExchangeAlt className="mr-2" /> Transactions
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={showLogoutConfirmToast}
                                    className="block py-2.5 px-4 rounded transition duration-200 text-black hover:bg-gray-200"
                                >
                                    <FaSignOutAlt className="mr-2" /> Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                    <a className="text-xl">Logo here</a>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link
                                to="/dashboard/"
                                className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/dashboard/') ? 'bg-green text-white' : 'bg-white text-black'}`}
                            >
                                <FaHome className="mr-2" /> Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/products"
                                className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/dashboard/products') ? 'bg-green text-white' : 'bg-white text-black'}`}
                            >
                                <FaFileAlt className="mr-2" /> Products
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/users"
                                className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/dashboard/users') ? 'bg-green text-white' : 'bg-white text-black'}`}
                            >
                                <FaUsers className="mr-2" /> Users
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/stores"
                                className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/dashboard/stores') ? 'bg-green text-white' : 'bg-white text-black'}`}
                            >
                                <FaStore className="mr-2" /> Stores
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/transactions"
                                className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/dashboard/transactions') ? 'bg-green text-white' : 'bg-white text-black'}`}
                            >
                                <FaExchangeAlt className="mr-2" /> Transactions
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="navbar-end flex gap-2">
                    {/* User Info */}
                    <div className="flex items-center space-x-4">
                        <span className="text-black">Hello, Admin</span>
                        <button onClick={showLogoutConfirmToast} className="btn bg-red-500 text-white">Logout</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </header>
    );
};

export default AdminNavbar;
