import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ProductDetail() {
    const { prodId } = useParams(); // Retrieve the _id from URL
    const [product, setProduct] = useState(null);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products/${prodId}`);
                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
                    fetchRecommendedProducts(data.category); // Fetch recommendations based on the category
                } else {
                    console.error('Product not found');
                    setProduct(null);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        const fetchRecommendedProducts = async (category) => {
            try {
                const response = await fetch(`http://localhost:3000/api/products?category=${category}`);
                if (response.ok) {
                    const data = await response.json();
                    const seRecommandations = data.filter(item => item._id !== prodId && item.category == category);
                    setRecommendedProducts(seRecommandations);
                } else {
                    console.error('Error fetching recommended products');
                }
            } catch (error) {
                console.error("Error fetching recommended products:", error);
            }
        };

        fetchProduct();
    }, [prodId]);

    if (product === null) {
        return <div className="text-center text-gray-500">Loading or Product not found...</div>;
    }

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <>
                {Array(fullStars).fill(null).map((_, index) => (
                    <FaStar key={`full-${index}`} className="text-yellow-500" />
                ))}
                {hasHalfStar && (
                    <FaStarHalfAlt key="half" className="text-yellow-500" />
                )}
                {Array(emptyStars).fill(null).map((_, index) => (
                    <FaRegStar key={`empty-${index}`} className="text-yellow-500" />
                ))}
            </>
        );
    };

    const addToCart = async () => {
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
                    productId: product._id,
                    quantity: 1, // Default quantity
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }

            // Handle successful response if needed (e.g., show a success message)
            toast.success('Product added to cart')
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };

    return (
        <div className="product-detail flex flex-col justify-center pt-20 px-4 sm:px-6 lg:px-8">
            {/* Main Content (Image + Necessary Info) */}
            <ToastContainer />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center items-center lg:space-x-12 space-y-6 lg:space-y-0 lg:h-[522px] justify-center">
                {/* Product Image */}
                <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center lg:justify-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-auto h-96 object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* Product Details */}
                <div className="lg:w-1/2 text-center lg:text-left">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                    <p className="text-lg text-gray-700 mb-6">{product.description}</p>
                    <p className="text-3xl font-bold text-green-600 mb-6">Price: ${product.price.toFixed(2)}</p>

                    <div className="flex justify-center lg:justify-start items-center mb-6">
                        <span className="text-lg font-semibold text-gray-900 mr-2">Rating:</span>
                        {renderStars(product.ratings.average)}
                        <span className="ml-2 text-gray-600">({product.ratings.reviews_count} reviews)</span>
                    </div>

                    <button
                        onClick={addToCart}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Add to Cart
                    </button>

                </div>
            </div>

            {/* Additional Information Section */}
            <div className="mt-12 w-full lg:w-1/2 lg:px-18">
                <h2 className="text-2xl font-semibold mb-4 text-left">Additional Information</h2>
                <div className="text-gray-600 space-y-2">
                    <p><strong className="font-semibold">Category:</strong> {product.category}</p>
                    <p><strong className="font-semibold">Brand:</strong> {product.brand}</p>
                    <p><strong className="font-semibold">Stock Quantity:</strong> {product.stock_quantity}</p>
                    <p><strong className="font-semibold">SKU:</strong> {product.sku}</p>
                    <p><strong className="font-semibold">Dimensions:</strong> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} inches</p>
                    <p><strong className="font-semibold">Weight:</strong> {product.dimensions.weight} lbs</p>
                    <p><strong className="font-semibold">Material Type:</strong> {product.material_type}</p>
                    <p><strong className="font-semibold">Availability:</strong> {product.availability}</p>
                    <p>
                        <strong className="font-semibold">Shipping Information:</strong>
                        {product.shipping_information.options.join(", ")} — ${product.shipping_information.cost.standard / 100} (Standard Shipping), Delivery in {product.shipping_information.delivery_times.standard} days
                    </p>
                </div>
            </div>

            {/* Recommended Products Section */}
            <div className="mt-12 w-full lg:px-18">
                <h2 className="text-2xl font-semibold mb-4 text-left">Recommended Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recommendedProducts.map((item) => (
                        <div key={item._id} className="border rounded-lg shadow-lg p-4 flex flex-col items-center">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-lg font-bold mb-2 text-center">{item.name}</h3>
                            <p className="text-gray-700 mb-2">${item.price.toFixed(2)}</p>
                            <div className="mt-2 flex justify-center items-center">
                                {renderStars(item.ratings.average)}
                                <span className="ml-2 text-gray-600 text-sm">({item.ratings.reviews_count} reviews)</span>
                            </div>
                            <button
                                onClick={() => navigate(`/product/${item._id}`)}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                            >
                                View Product
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
