import React, { useState } from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Cards = ({ item, addToCart }) => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleAddToCart = () => {

    if (item) {
      addToCart(item);
    }
  };

  if (!item) {
    return null; // Or render a fallback UI
  }

  return (
    <div className="card shadow-xl relative mr-5 md:my-5">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${isHeartFilled ? 'text-rose-500' : 'text-white'}`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>
      <Link to={`/product/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt={item.name}
            className="md:h-72 w-[200px] h-[200px] object-cover"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/product/${item._id}`}>
          <h2 className="card-title text-lg font-semibold">{item.name}</h2>
        </Link>
        <div className="flex justify-between items-center text-gray-500 mt-2">
          <p>by: {item.brand}</p>
          {item.ratings.average}<FaStar className='text-yellow-400' />

        </div>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold text-xl">
            <span className="text-sm text-red"> </span> <span>&#8377;</span> {item.price}
          </h5>
          <button
            className="btn bg-green text-white py-2 px-4 rounded"
            onClick={handleAddToCart} // Call handleAddToCart
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
