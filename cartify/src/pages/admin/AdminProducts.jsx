import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrashAlt, FaEye, FaSearch } from 'react-icons/fa';
import AddProductForm from './forms/product/AddProductForm'; // Adjust the import path as needed
import UpdateProductForm from './forms/product/UpdateProductForm'; // Adjust the import path as needed

const Product = () => {
    const [products, setProducts] = useState([]);
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [search, setSearch] = useState(''); // State for search query

    useEffect(() => {
        // Fetch product data from the API or static file
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products'); // Adjust the path if necessary
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchData();
    }, []);

    const handleAddProduct = async (newProduct) => {
        try {
            const response = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) {
                throw new Error('Failed to add product');
            }

            const addedProduct = await response.json();
            setProducts([...products, addedProduct]);
            setShowAddProductForm(false);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleUpdateProduct = async (updatedProduct) => {
        try {
            const response = await fetch(`http://localhost:3000/api/products/${updatedProduct._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            const updatedProductFromServer = await response.json();
            setProducts(products.map(product =>
                product._id === updatedProductFromServer._id ? updatedProductFromServer : product
            ));
            setEditingProduct(null);
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update the product. Please try again.');
        }
    };

    const handleRemoveProduct = async (id) => {
        try {
            await fetch(`http://localhost:3000/api/products/${id}`, {
                method: 'DELETE',
            });
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
    };



    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4 pt-20 bg-white rounded-md shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-600 text-xl font-semibold">Product Management</h2>
                <button
                    onClick={() => setShowAddProductForm(!showAddProductForm)}
                    className={`${showAddProductForm ? 'bg-blue-700' : 'bg-blue-500'} hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded flex items-center transition-colors`}
                >
                    <FaPlus className="mr-2" /> {showAddProductForm ? 'Cancel' : 'Add Product'}
                </button>
            </div>
            {showAddProductForm && <AddProductForm onAddProduct={handleAddProduct} />}
            {editingProduct && (
                <UpdateProductForm
                    product={editingProduct}
                    onUpdateProduct={handleUpdateProduct}
                    onCancel={() => setEditingProduct(null)}
                />
            )}
            <div className="relative max-w-md w-full mb-4">
                <div className="absolute top-1 left-2 inline-flex items-center p-2">
                    <FaSearch className="text-gray-400" />
                </div>
                <input
                    className="w-full h-10 pl-10 pr-4 py-1 text-base placeholder-gray-500 border rounded-full focus:shadow-outline"
                    type="search"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <table className="w-full table-auto text-sm">
                <thead>
                    <tr className="text-sm leading-normal">
                        <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">ID</th>
                        <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Image</th>
                        <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Name</th>
                        <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Category</th>
                        <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Price</th>
                        <th className="py-2 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <tr key={product._id} className="hover:bg-gray-100 transition-colors">
                                <td className="py-2 px-4 border-b border-gray-200">{product._id}</td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded">
                                        <img src={product.image} alt={product.name} className="max-w-full max-h-full object-cover rounded" />
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200">{product.name}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{product.category}</td>
                                <td className="py-2 px-4 border-b border-gray-200">${product.price.toFixed(2)}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-center">

                                    <button
                                        onClick={() => handleEditClick(product)}
                                        className="text-blue-500 hover:text-blue-700 mr-2"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleRemoveProduct(product._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="py-2 px-4 text-center text-gray-500">No products found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Product;
