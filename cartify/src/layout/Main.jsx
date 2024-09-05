import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../App.css'
import Footer from '../components/Footer'

function Main() {
    return (
        <>
            <Navbar />
            <Outlet />   {/* By using a common layout with a Navbar, Footer, and an Outlet for dynamic content rendering */}

            <Footer />


        </>
    )
}

export default Main