import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PopularCategories = () => {
    const [categories, setCategories] = useState([
        { name: 'Bed Frame', imageUrl: 'https://img.freepik.com/free-photo/bed-bedroom-decorated-with-brazilian-folklore-design_23-2150794105.jpg?t=st=1724925886~exp=1724929486~hmac=0a3849913e6d92c1e9cb42031c62f17ff1cba5071ee61963711d63daa899101d&w=900', itemsCount: '0 Bed Frames' },
        { name: 'Table', imageUrl: 'https://img.freepik.com/premium-photo/empty-wood-table-top-beige-wall-texture-with-tree-leaves-shadow-white-background_1012648-568.jpg?w=900', itemsCount: '0 Tables' },
        { name: 'Chair', imageUrl: 'https://img.freepik.com/free-photo/view-school-desk_23-2151110150.jpg?t=st=1724925979~exp=1724929579~hmac=0c78275cf5514059b0285bcc82bf88424a5915005a611f74712bb377d95d5304&w=740', itemsCount: '0 Chairs' },
        { name: 'Browse All', imageUrl: 'https://img.freepik.com/free-photo/retro-couch-living-room_23-2150711900.jpg?ga=GA1.1.888509609.1724736798&semt=ais_hybrid', itemsCount: '0 Products' },
    ]);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the products data
        fetch('/src/assets/products.json')
            .then(response => response.json())
            .then(data => {
                // Count items per category
                const counts = data.reduce((acc, item) => {
                    const category = item.category === 'Bed' ? 'Bed Frame' : item.category;
                    acc[category] = (acc[category] || 0) + 1;
                    return acc;
                }, {});

                // Total number of products
                const totalProducts = data.length;

                // Update categories with the correct item counts
                setCategories(prevCategories =>
                    prevCategories.map(category => ({
                        ...category,
                        itemsCount: category.name === 'Browse All'
                            ? `${totalProducts} Products`
                            : `${counts[category.name] || 0} ${category.name}s`
                    }))
                );
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleCategoryClick = (categoryName) => {
        navigate(`/products?category=${categoryName}`);
    };


    return (
        <div className="container mx-auto py-10 px-2">
            <h2 className="text-center text-red-600 font-bold mb-6 uppercase">
                Customer Favorites
            </h2>
            <h3 className="text-center text-3xl font-bold mb-8">
                Popular Categories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer"
                        onClick={() => handleCategoryClick(category.name)}
                    >
                        <img
                            src={category.imageUrl}
                            alt={category.name}
                            className="mx-auto mb-4 rounded-full w-24 h-24 object-cover"
                        />
                        <h4 className="text-xl font-bold mb-2">{category.name}</h4>
                        <p className="text-gray-500">{category.itemsCount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularCategories;
