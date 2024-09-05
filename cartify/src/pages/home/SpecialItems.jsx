import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import Card from '../../components/Cards';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SpecialItems = () => {
    const [products, setProducts] = useState([]);
    const [likedItems, setLikedItems] = useState(new Set()); // Set to track liked items
    const sliderRef = useRef(null); // Reference to the Slider component

    useEffect(() => {
        fetch('http://localhost:3000/api/products')
            .then(response => response.json())
            .then(data => {
                const specialproducts = data.filter(item => item.ratings && item.ratings.average > 4.8);
                setProducts(specialproducts);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

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
            toast.success('Item added to cart successfully');

            // Handle successful response if needed
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };

    const handlePrevClick = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const handleNextClick = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1, // Default for mobile
        slidesToScroll: 1,

        responsive: [
            {
                breakpoint: 640, // Small screens (sm)
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 1024, // Medium screens (md)
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 1400, // Large screens (lg)
                settings: {
                    slidesToShow: 4
                }
            }
        ]
    };

    return (
        <div className="container mx-auto py-10 px-4 lg:py-24">
            <ToastContainer />
            <div className='flex lg:flex-row lg:justify-between lg:items-center mb-6'>
                {/* Heading */}
                <div className=''>
                    <h2 className="text-red-600 font-bold mb-6 uppercase">
                        Special And Most Liked Items
                    </h2>
                    <h3 className="text-3xl font-bold mb-8">
                        Featured Items with High Ratings
                    </h3>
                </div>

                {/* Navigation Buttons */}
                <div className='flex gap-5'>
                    <button onClick={handlePrevClick} className='btn bg-gray-100 btn-ghost btn-circle'>
                        <GrFormPrevious className='text-xl' />
                    </button>
                    <button onClick={handleNextClick} className='btn bg-green-500 btn-circle'>
                        <MdNavigateNext className='text-xl' />
                    </button>
                </div>
            </div>

            <div className='relative'>
                <Slider ref={sliderRef} {...sliderSettings} className='slider-container'>
                    {products.map((product) => (
                        <div key={product._id} className="bg-white p-4 lg:p-6 rounded-lg shadow-md text-center slide-item">
                            <Card
                                item={product}

                                addToCart={() => addToCart(product)}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default SpecialItems;
