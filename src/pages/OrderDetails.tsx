import React, { useEffect, useState } from 'react';
import { useOrderDetailsQuery } from '../redux/dashboardFeatures/Order/orderSlice';
import { XIcon } from 'lucide-react';

const OrderDetails = ({ orderId, closeModal }) => {
    const { data, isLoading } = useOrderDetailsQuery(orderId);
    const [totalMoney, setTotalMoney] = useState()

    useEffect(() => {
        setTotalMoney(data?.data[0]?.order?.total_amount)
    }, [data])

    if (isLoading) {
        return (
            <div className='flex h-[600px] items-center justify-center'>
                <h1>Loading...</h1>
            </div>
        );
    }

    // Check if the data exists and contains the songs
    const order = data?.data || [];

    console.log(`  order details is ${order} `)

    return (
        <div className="max-w-7xl mx-auto p-6 h-[600px] overflow-y-auto bg-white rounded-lg shadow-lg">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-semibold">{order?.customer_name || "Customer Name"}</h2>
                    <p className="text-gray-600 text-sm">
                        {order?.address || "Customer Address"}
                    </p>
                </div>
                <button onClick={closeModal} className="text-gray-500 hover:text-black">
                    <XIcon className="h-6 w-6" />
                </button>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Song</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Song Poster</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Artist Name</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Quantity</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Loop through order items dynamically */}
                        {order?.map((item, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm">{item?.song?.title || 'Unknown Song'}</td>
                                <td className="px-4 py-2">
                                    <img
                                        src={`${import.meta.env.VITE_BASE_URL}/${item?.song?.song_poster}` || "https://via.placeholder.com/60"}
                                        alt="Song Poster"
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td className="px-4 py-2 text-sm  ">{item?.song?.artist.name || 'Unknown Artist'}</td>
                                <td className="px-4 py-2 text-sm text-center ">{item?.quantity || 0}</td>
                                <td className="px-4 py-2 text-sm text-center ">{`$${item?.price || 0}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer Section */}
            <div className="mt-6 flex justify-between items-center">
                <span className="text-green-600 font-semibold">Paid</span>
                <div className="text-right">
                    <span className="text-lg font-semibold">Subtotal: </span>
                    <span className="text-2xl font-bold text-gray-800">{`$${totalMoney || 0}`}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
