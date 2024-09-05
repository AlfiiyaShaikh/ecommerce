import React from 'react';
import { useForm, Controller } from 'react-hook-form';

const shippingOptions = ['Standard', 'Express', 'Next-Day'];

const AddProductForm = ({ onAddProduct }) => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {

            await onAddProduct(data);
            reset();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="p-4 bg-white rounded-md shadow-md mb-4 max-w-3xl mx-auto">
            <h2 className="text-gray-700 text-lg font-semibold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm">Name</label>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="text"
                                {...field}
                                className="p-2 border rounded-md text-sm"
                                placeholder="Product name"
                            />
                        )}
                        rules={{ required: 'Name is required' }}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Description */}
                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm">Description</label>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <textarea
                                {...field}
                                className="p-2 border rounded-md text-sm"
                                placeholder="Product description"
                            />
                        )}
                        rules={{ required: 'Description is required' }}
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>

                {/* Category */}
                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm">Category</label>
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="text"
                                {...field}
                                className="p-2 border rounded-md text-sm"
                                placeholder="Product category"
                            />
                        )}
                        rules={{ required: 'Category is required' }}
                    />
                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                </div>

                {/* Price */}
                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm">Price</label>
                    <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="number"
                                {...field}
                                className="p-2 border rounded-md text-sm"
                                placeholder="Product price"
                                step="0.01"
                            />
                        )}
                        rules={{ required: 'Price is required', min: { value: 0, message: 'Price must be positive' } }}
                    />
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                </div>

                {/* Brand */}
                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm">Brand</label>
                    <Controller
                        name="brand"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="text"
                                {...field}
                                className="p-2 border rounded-md text-sm"
                                placeholder="Product brand"
                            />
                        )}
                    />
                </div>

                {/* Image URL */}
                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm">Image URL</label>
                    <Controller
                        name="image"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="text"
                                {...field}
                                className="p-2 border rounded-md text-sm"
                                placeholder="Image URL"
                            />
                        )}
                    />
                </div>

                {/* Stock Quantity */}
                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm">Stock Quantity</label>
                    <Controller
                        name="stock_quantity"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="number"
                                {...field}
                                className="p-2 border rounded-md text-sm"
                                placeholder="Stock quantity"
                                step="1"
                            />
                        )}
                        rules={{ required: 'Stock quantity is required', min: { value: 0, message: 'Stock quantity must be positive' } }}
                    />
                    {errors.stock_quantity && <p className="text-red-500 text-xs mt-1">{errors.stock_quantity.message}</p>}
                </div>

                {/* SKU */}
                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm">SKU</label>
                    <Controller
                        name="sku"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="text"
                                {...field}
                                className="p-2 border rounded-md text-sm"
                                placeholder="SKU"
                            />
                        )}
                    />
                </div>

                {/* Discount */}
                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm">Discount</label>
                    <Controller
                        name="discount"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="number"
                                {...field}
                                className="p-2 border rounded-md text-sm"
                                placeholder="Discount"
                                step="0.01"
                            />
                        )}
                    />
                </div>

                {/* Tags */}
                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm">Tags</label>
                    <Controller
                        name="tags"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="text"
                                {...field}
                                className="p-2 border rounded-md text-sm"
                                placeholder="Tags (comma separated)"
                            />
                        )}
                    />
                </div>

                {/* Availability */}
                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm">Availability</label>
                    <Controller
                        name="availability"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="text"
                                {...field}
                                className="p-2 border rounded-md text-sm"
                                placeholder="Availability"
                            />
                        )}
                    />
                </div>

                {/* Material Type */}
                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm">Material Type</label>
                    <Controller
                        name="material_type"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="text"
                                {...field}
                                className="p-2 border rounded-md text-sm"
                                placeholder="Material type"
                            />
                        )}
                    />
                </div>

                {/* Ratings */}
                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm">Average Rating</label>
                    <Controller
                        name="ratings.average"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="number"
                                {...field}
                                className="p-2 border rounded-md text-sm"
                                placeholder="Average rating"
                                step="0.1"
                            />
                        )}
                        rules={{ required: 'Average rating is required', min: { value: 0, message: 'Rating must be positive' }, max: { value: 5, message: 'Rating cannot exceed 5' } }}
                    />
                    {errors['ratings.average'] && <p className="text-red-500 text-xs mt-1">{errors['ratings.average'].message}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm">Reviews Count</label>
                    <Controller
                        name="ratings.reviews_count"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="number"
                                {...field}
                                className="p-2 border rounded-md text-sm"
                                placeholder="Number of reviews"
                                step="1"
                            />
                        )}
                        rules={{ required: 'Reviews count is required', min: { value: 0, message: 'Reviews count must be positive' } }}
                    />
                    {errors['ratings.reviews_count'] && <p className="text-red-500 text-xs mt-1">{errors['ratings.reviews_count'].message}</p>}
                </div>

                {/* Dimensions */}
                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm">Width</label>
                    <Controller
                        name="dimensions.width"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="text"
                                {...field}
                                className="p-2 border rounded-md text-sm"
                                placeholder="Width"
                            />
                        )}
                        rules={{ required: 'Width is required' }}
                    />
                    {errors['dimensions.width'] && <p className="text-red-500 text-xs mt-1">{errors['dimensions.width'].message}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm">Height</label>
                    <Controller
                        name="dimensions.height"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="text"
                                {...field}
                                className="p-2 border rounded-md text-sm"
                                placeholder="Height"
                            />
                        )}
                        rules={{ required: 'Height is required' }}
                    />
                    {errors['dimensions.height'] && <p className="text-red-500 text-xs mt-1">{errors['dimensions.height'].message}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm">Depth</label>
                    <Controller
                        name="dimensions.depth"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="text"
                                {...field}
                                className="p-2 border rounded-md text-sm"
                                placeholder="Depth"
                            />
                        )}
                        rules={{ required: 'Depth is required' }}
                    />
                    {errors['dimensions.depth'] && <p className="text-red-500 text-xs mt-1">{errors['dimensions.depth'].message}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm">Weight</label>
                    <Controller
                        name="dimensions.weight"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="text"
                                {...field}
                                className="p-2 border rounded-md text-sm"
                                placeholder="Weight"
                            />
                        )}
                        rules={{ required: 'Weight is required' }}
                    />
                    {errors['dimensions.weight'] && <p className="text-red-500 text-xs mt-1">{errors['dimensions.weight'].message}</p>}
                </div>

                {/* Shipping Information */}
                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm">Shipping Option</label>
                    <Controller
                        name="shipping_information.options"
                        control={control}
                        render={({ field }) => (
                            <select
                                {...field}
                                className="p-2 border rounded-md text-sm"
                            >
                                <option value="">Select option</option>
                                {shippingOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        )}
                        rules={{ required: 'Shipping option is required' }}
                    />
                    {errors['shipping_information.options'] && <p className="text-red-500 text-xs mt-1">{errors['shipping_information.options'].message}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm">Shipping Cost</label>
                    <Controller
                        name="shipping_information.cost.standard"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="number"
                                {...field}
                                className="p-2 border rounded-md text-sm"
                                placeholder="Shipping cost"
                                step="0.01"
                            />
                        )}
                        rules={{ required: 'Shipping cost is required', min: { value: 0, message: 'Shipping cost must be positive' } }}
                    />
                    {errors['shipping_information.cost.standard'] && <p className="text-red-500 text-xs mt-1">{errors['shipping_information.cost.standard'].message}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm">Delivery Times</label>
                    <Controller
                        name="shipping_information.delivery_times.standard"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="text"
                                {...field}
                                className="p-2 border rounded-md text-sm"
                                placeholder="Delivery times"
                            />
                        )}
                        rules={{ required: 'Delivery times are required' }}
                    />
                    {errors['shipping_information.delivery_times.standard'] && <p className="text-red-500 text-xs mt-1">{errors['shipping_information.delivery_times.standard'].message}</p>}
                </div>

                {/* Submit Button */}
                <div className="col-span-2 flex justify-center">
                    <button
                        type="submit"
                        className="bg-green text-white font-semibold py-1 px-3 rounded text-sm"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;

