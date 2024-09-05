import React from 'react'
import '../App.css'
import { FaPlay } from "react-icons/fa";
import { Link } from 'react-router-dom';
function HeroSection() {
    const product = {
        title: "Discover the Latest in Fashion",
        description: "Upgrade your wardrobe with the latest trends in fashion. Shop now and enjoy exclusive offers.",
        button1: "Shop Now",
        button2: "View Collection"




    };

    return (
        <div className="structure-container bg-white flex flex-col lg:flex-row items-center justify-between p-10 pt-36">
            <div className="lg:w-1/2 flex flex-col items-start">
                <h1 className="text-5xl font-bold text-black">
                    {product.title}
                </h1>
                <p className="py-6 text-gray-600 text-lg">
                    {product.description}
                </p>
                <div className="flex items-center space-x-4">
                    <Link to={'/products'}> <button className="btn bg-green text-white font-semibold py-2 px-6 rounded-3xl hover:bg-green-600 transition">
                        {product.button1}
                    </button></Link>
                    <button className="btn bg-white border border-gray-300 text-black font-semibold py-2 px-6 rounded-lg flex items-center space-x-2 shadow hover:bg-gray-100 transition">
                        <span>{product.button2}</span>
                        <FaPlay />
                    </button>
                </div>
            </div>

            {/* Flipping card */}
            <div className="lg:w-1/2 mt-10 lg:mt-0 flex items-center justify-end relative">
                <div className="carousel carousel-center bg-secondary rounded-box max-w-md space-x-4 p-4">
                    <div className="carousel-item">
                        <img
                            src="https://i.pinimg.com/736x/93/fc/fe/93fcfe20210425da0da3ba3b24c17253.jpg"
                            className="rounded-box w-[300px] h-[400px]" />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://i.pinimg.com/originals/9b/de/2f/9bde2f3f303b060a64ddfdbef63427a6.jpg?charming-buying-a-vintage-moroccan-rug-black-amp-blooms-on-boho-home-decor-bohemian-living-room-ideas-bloxburg-aesthetic"
                            className="rounded-box  w-[300px] h-[400px]" />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://i.pinimg.com/736x/e2/2a/a8/e22aa86c6dfd0366a557c391a17c5e81.jpg"
                            className="rounded-box  w-[300px] h-[400px]" />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://homesfornh.com/wp-content/uploads/2020/10/Bohemian-Bedroom-Design-with-Tropical-Style.jpg"
                            className="rounded-box  w-[300px] h-[400px]" />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://th.bing.com/th/id/OIP.JchMlQm-6VJcjpxxFB3moAHaJQ?w=146&h=183&c=7&r=0&o=5&pid=1.7"
                            className="rounded-box w-[300px] h-[400px]" />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://i.pinimg.com/originals/2a/65/ad/2a65ad7d9b4df5b74093d08178dbcda4.jpg"
                            className="rounded-box w-[300px] h-[400px]" />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://media.karousell.com/media/photos/products/2023/3/31/aesthetic_chair_1680244355_d7c5dd9f.jpg"
                            className="rounded-box w-[300px] h-[400px]" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection