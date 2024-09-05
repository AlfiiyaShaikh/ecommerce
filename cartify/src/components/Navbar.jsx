import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Navbar() {
    const user = JSON.parse(localStorage.getItem('user'));

    const logout = () => {
        localStorage.removeItem('user');
        window.location.reload();
    };

    const navigate = useNavigate();
    const handleCategoryClick = (categoryName) => {
        navigate(`/products?category=${categoryName}`);
    };

    const linkItems = (
        <>
            <li>
                <Link to={'/'}>Home</Link>
            </li>
            <li>
                <details>
                    <summary>Products</summary>
                    <ul className="p-2">
                        <button onClick={() => handleCategoryClick('Table')}>Table</button><br />
                        <button onClick={() => handleCategoryClick('Sofa')}>Sofa</button><br />
                        <button onClick={() => handleCategoryClick('Chair')}>Chair</button><br />
                        <button onClick={() => handleCategoryClick('Bed Frame')}>Bed Frame</button>
                    </ul>
                </details>
            </li>
            <li>
                <a href="mailto:alfiyashaikh2506@gmail.com?subject=Contact%20Us&body=Hello%2C%0A%0A" target="_blank" rel="noopener noreferrer">Contact</a>
            </li>
        </>
    );

    return (
        <header className='fixed top-0 left-0 right-0 bg-primary z-10'>
            <div className="navbar xl:px-24">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            {linkItems}
                        </ul>
                    </div>
                    <a className="text-xl">Logo here</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {linkItems}
                    </ul>
                </div>

                <div className="navbar-end flex gap-2">

                    {/* Cart */}
                    <Link to={'/cart'}>
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>

                                <span className="badge badge-sm indicator-item">
                                    {localStorage.getItem('cartbadge')}
                                </span>


                            </div>
                        </div>
                    </Link>

                    {/* User Info */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="text-black">Hello, {user.user.user}</span>
                                <button onClick={logout} className="btn bg-red-500 text-white">Logout</button>
                            </>
                        ) : (
                            <Link to='/login'>
                                <button className="btn bg-green text-white">Login</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
