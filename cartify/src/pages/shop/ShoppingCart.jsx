import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaTrash } from "react-icons/fa";


const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Initialize navigate
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        console.error('User not found in localStorage');
        return (

            <div className="flex items-center justify-center h-screen p-6 bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <p className="text-lg font-semibold mb-4">Please log in to view your cart</p>
                    <Link
                        to="/login"
                        className="inline-block px-6 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </Link>
                </div>
            </div>

        );
    }

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/cart/${user.user.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch cart data');
                }
                const data = await response.json();
                if (data && data.items && Array.isArray(data.items)) {
                    setCartItems(data.items);
                } else {
                    console.error('Unexpected response format:', data);
                    setCartItems([]);
                }
                localStorage.setItem('cartbadge', data.items.length);
            } catch (error) {
                console.error("Error fetching cart data:", error);
                setCartItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCartData();
    }, [user.user.id]);

    const handleRemoveItem = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/cart/${user.user.id}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to remove item');
            }
            const updatedCart = await response.json();
            setCartItems(updatedCart.items);
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const handleQuantityChange = async (id, quantity) => {
        if (quantity <= 0) {
            console.error("Quantity must be greater than 0");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/cart/${user.user.id}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to update quantity');
            }

            const updatedCart = await response.json();
            setCartItems(updatedCart.items);
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const calculateTotal = () => {
        if (!Array.isArray(cartItems)) {
            console.error('cartItems is not an array:', cartItems);
            return '0.00';
        }
        return cartItems.reduce((total, item) => {
            const price = item.product?.price || 0;
            return total + price * item.quantity;
        }, 0).toFixed(2);
    };

    const handleProceedToCheckout = () => {
        const totalAmount = calculateTotal();
        navigate(`/checkout?totalAmount=${totalAmount}`); // Pass totalAmount as a query parameter
    };

    if (loading) {
        return <div className="container mx-auto my-10">Loading...</div>;
    }

    return (
        <div className="container mx-auto my-10">
            <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    {cartItems.length > 0 ? (
                        cartItems.map(item => (
                            <div key={item._id} className="flex items-center mb-4 p-4 border rounded-lg shadow-sm">
                                <img src={item.product?.image || '/default-image.png'} alt={item.product?.name || 'Product'} className="w-20 h-20 object-cover rounded-lg mr-4" />
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-lg">{item.product?.name || 'Unknown Product'}</h3>
                                    <p className="text-gray-500">Price: <span>&#8377;</span> {item.product?.price ? item.product.price.toFixed(2) : '0.00'}</p>
                                    <div className="flex items-center mt-2">
                                        <label htmlFor={`quantity-${item._id}`} className="mr-2">Quantity:</label>
                                        <input
                                            type="number"
                                            id={`quantity-${item._id}`}
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                                            className="w-16 p-2 border rounded-lg"
                                        />
                                    </div>
                                </div>
                                <button onClick={() => handleRemoveItem(item.product._id)} className="text-red-500 hover:text-red-700 ml-4">
                                    <FaTrash />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Cart Summary</h3>
                    <p className="mb-2">Total Items: {cartItems.length}</p>
                    <p className="mb-4">Total Price: <span>&#8377;</span> {calculateTotal()}</p>
                    <button onClick={handleProceedToCheckout} className="bg-green text-white py-2 px-4 rounded w-full">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
