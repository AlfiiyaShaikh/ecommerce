import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import Cards from '../../components/Cards';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Products() {
    const location = useLocation(); // Use location to get query parameters
    const [products, setProducts] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOption, setSortOption] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8); // Number of items to display per page

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products');
                const data = await response.json();
                setProducts(data);
                setFilteredItems(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category');
        if (category) {
            filterItems(category);
        }
    }, [location.search]);

    const addToCart = async (item) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            console.error('User information is not available');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/cart/${user.user.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: item._id,
                    quantity: 1, // Default quantity
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }
            toast.success("Product added to cart")

            // Handle successful response if needed
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };


    const filterItems = (category) => {
        const filtered =
            category === "all"
                ? products
                : products.filter((item) => item.category === category);

        setFilteredItems(filtered);
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const showAll = () => {
        setFilteredItems(products);
        setSelectedCategory("all");
        setCurrentPage(1);
    };

    const handleSortChange = (option) => {
        setSortOption(option);

        let sortedItems = [...filteredItems];

        switch (option) {
            case "A-Z":
                sortedItems.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Z-A":
                sortedItems.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "low-to-high":
                sortedItems.sort((a, b) => a.price - b.price);
                break;
            case "high-to-low":
                sortedItems.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        setFilteredItems(sortedItems);
        setCurrentPage(1);
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {/* Shop */}
            <div className="container mx-auto pt-20 py-8 px-4">
                <ToastContainer />
                <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
                    {/* Category Buttons */}
                    <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
                        <button
                            onClick={showAll}
                            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${selectedCategory === "all" ? "bg-green text-white" : "bg-white text-gray-700 border border-gray-300"}`}
                        >
                            All
                        </button>

                        <button
                            onClick={() => filterItems("Shelf")}
                            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${selectedCategory === "Shelf" ? "bg-green text-white" : "bg-white text-gray-700 border border-gray-300"}`}
                        >
                            Book Shelf
                        </button>
                        <button
                            onClick={() => filterItems("Sofa")}
                            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${selectedCategory === "Sofa" ? "bg-green text-white" : "bg-white text-gray-700 border border-gray-300"}`}
                        >
                            Sofa
                        </button>
                        <button
                            onClick={() => filterItems("Table")}
                            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${selectedCategory === "Table" ? "bg-green text-white" : "bg-white text-gray-700 border border-gray-300"}`}
                        >
                            Table
                        </button>
                        <button
                            onClick={() => filterItems("Bed Frame")}
                            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${selectedCategory === "Bed Frame" ? "bg-green text-white" : "bg-white text-gray-700 border border-gray-300"}`}
                        >
                            Bed
                        </button>
                        <button
                            onClick={() => filterItems("Chair")}
                            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${selectedCategory === "Chair" ? "bg-green text-white" : "bg-white text-gray-700 border border-gray-300"}`}
                        >
                            Chair
                        </button>
                        {/* Add more categories */}
                    </div>

                    {/* Filter Options */}
                    <div className="flex justify-end mb-4 rounded-sm">
                        <div className="bg-black p-2 rounded-sm">
                            <FaFilter className="text-white h-4 w-4" />
                        </div>
                        <select
                            id="sort"
                            onChange={(e) => handleSortChange(e.target.value)}
                            value={sortOption}
                            className="bg-black text-white px-2 py-1 rounded-sm ml-2"
                        >
                            <option value="default">Default</option>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                            <option value="low-to-high">Low to High</option>
                            <option value="high-to-low">High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Product Cards */}
                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                    {currentItems.map((item) => (
                        <Cards key={item._id} item={item} addToCart={addToCart} />
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center my-8">
                {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`mx-1 px-3 py-1 rounded-full transition-colors duration-300 ${currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Products;
