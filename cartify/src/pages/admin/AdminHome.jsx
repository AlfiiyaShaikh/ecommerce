// src/Home.js
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Outlet, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Register necessary components for Line charts
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const AdminHome = () => {
    const [users, setUsers] = useState([]);
    const [stores, setStores] = useState([]);
    const [userChartData, setUserChartData] = useState({ labels: [], datasets: [] });
    const [storeChartData, setStoreChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, storesRes] = await Promise.all([
                    fetch('http://localhost:3000/api/users?limit=100'),
                    fetch('http://localhost:3000/api/stores?limit=100'),
                ]);

                const [usersData, storesData] = await Promise.all([
                    usersRes.json(),
                    storesRes.json(),
                ]);

                setUsers(usersData);
                setStores(storesData);

                const userAggregation = aggregateUserData(usersData);
                const storeAggregation = aggregateStoreData(storesData);

                setUserChartData({
                    labels: userAggregation.labels,
                    datasets: [{
                        label: 'Users Data',
                        data: userAggregation.data,
                        borderColor: 'rgba(75,192,192,1)',
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        borderWidth: 1,
                    }],
                });

                setStoreChartData({
                    labels: storeAggregation.labels,
                    datasets: [{
                        label: 'Stores Data',
                        data: storeAggregation.data,
                        borderColor: 'rgba(153,102,255,1)',
                        backgroundColor: 'rgba(153,102,255,0.2)',
                        borderWidth: 1,
                    }],
                });

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const aggregateUserData = (data) => {
        const roles = {};
        data.forEach(user => {
            roles[user.role] = (roles[user.role] || 0) + 1;
        });

        return {
            labels: Object.keys(roles),
            data: Object.values(roles),
        };
    };

    const aggregateStoreData = (data) => {
        const locations = {};
        data.forEach(store => {
            locations[store.location] = (locations[store.location] || 0) + 1;
        });

        return {
            labels: Object.keys(locations),
            data: Object.values(locations),
        };
    };

    return (
        <div className="flex-1 p-4 pt-20">


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="bg-white p-4 rounded-md">
                    <h2 className="text-gray-500 text-lg font-semibold pb-1">Users</h2>
                    <div className="bg-gradient-to-r from-green-300 to-green-500 h-px mb-6"></div>
                    <div className="h-40 w-full bg-gray-200 rounded-md flex items-center justify-center">
                        <Line data={userChartData} options={{ responsive: true }} />
                    </div>
                    <table className="w-full table-auto text-sm mt-4">
                        <thead>
                            <tr className="text-sm leading-normal">
                                <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Photo</th>
                                <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Name</th>
                                <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map(user => (
                                    <tr key={user._id} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border-b border-gray-200">
                                            <img src={user.photo || "https://via.placeholder.com/40"} alt="Profile" className="rounded-full h-10 w-10" />
                                        </td>
                                        <td className="py-2 px-4 border-b border-gray-200">{user.name}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{user.role}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="py-2 px-4 border-b border-gray-200 text-center">No users available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Link to="/dashboard/users">
                        <div className="mt-4">
                            <button className="bg-green text-white font-semibold py-2 px-4 rounded">
                                View More
                            </button>
                        </div>
                    </Link>
                </div>

                <div className="bg-white p-4 rounded-md">
                    <h2 className="text-gray-500 text-lg font-semibold pb-1">Stores</h2>
                    <div className="bg-gradient-to-r from-green-300 to-green-500 h-px mb-6"></div>
                    <div className="h-40 w-full bg-gray-200 rounded-md flex items-center justify-center">
                        <Line data={storeChartData} options={{ responsive: true }} />
                    </div>
                    <table className="w-full table-auto text-sm mt-4">
                        <thead>
                            <tr className="text-sm leading-normal">
                                <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Name</th>
                                <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stores.length > 0 ? (
                                stores.map(store => (
                                    <tr key={store._id} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border-b border-gray-200">{store.name}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{store.location}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="py-2 px-4 border-b border-gray-200 text-center">No stores available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Link to="/dashboard/stores">
                        <div className="mt-4">
                            <button className="bg-green text-white font-semibold py-2 px-4 rounded">
                                View More
                            </button>
                        </div>
                    </Link>
                </div>
            </div>

            <Outlet />
        </div>
    );
};

export default AdminHome;
