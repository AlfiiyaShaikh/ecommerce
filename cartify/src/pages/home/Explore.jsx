import React from 'react'
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdOutlineStar } from "react-icons/md";
import { GiReturnArrow } from "react-icons/gi";
import '../../App.css'
function Explore() {

    return (
        <div className="bg-gradient-to-r from-gray-200 via-gray-700 to-gray-200 text-white p-6 mb-24">
            <div className="flex justify-center space-x-8">
                {/* Page Genuineness */}
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 text-primary">
                        <MdOutlineStar className='text-4xl' />
                    </div>
                    <div>
                        <div className="text-lg font-semibold">Page Genuineness</div>
                        <div className="text-sm">Verified and authentic content</div>
                    </div>
                </div>

                {/* Secure Payment */}
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 text-primary">
                        <RiSecurePaymentLine className='text-4xl' />
                    </div>
                    <div>
                        <div className="text-lg font-semibold">Secure Payment</div>
                        <div className="text-sm">Safe and reliable transactions</div>
                    </div>
                </div>

                {/* Hassle-Free Returns */}
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 text-primary">
                        <GiReturnArrow className='text-4xl' />
                    </div>
                    <div>
                        <div className="text-lg font-semibold">Hassle-Free Returns</div>
                        <div className="text-sm">Easy and straightforward returns</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Explore