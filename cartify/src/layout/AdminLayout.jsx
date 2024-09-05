// src/pages/admin/AdminLayout.js
import React, { useState } from 'react';
import AdminNavbar from '../components/AdminNavbar'; // Import appropriate Navbar if needed

import Footer from '../components/Footer';  // Import Footer if it’s used in admin layout
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <AdminNavbar />
            <div className="flex-1 flex">
                {/* <AdminSidebar isOpen={isSidebarOpen} /> */}
                <div className="flex-1 p-4">
                    <Outlet />  {/* Renders nested admin routes */}
                </div>
            </div>
            {/* Add or remove Footer based on admin layout needs */}
            <Footer />
        </div>
    );
};

export default AdminLayout;
