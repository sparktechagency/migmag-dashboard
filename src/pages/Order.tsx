

import React, { useState } from "react";
import { useOrderGetQuery } from "../redux/dashboardFeatures/Order/orderSlice";
import OrderDetails from "./OrderDetails";

interface OrderType {
  id: number;
  order_number: string;
  total_amount: number;
  created_at: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
    location?: string;
  };
  order_details?: OrderDetail[];
}

interface OrderDetail {
  id: number;
  quantity: number;
  price: number;
  song: { song_poster: string };
  artist: { name: string };
  order: { order_number: string };
}

const Order = () => {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const per_page = 7;
  const [detailsData, setDetailsData] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Order list query with pagination
  const { data: orderData, isLoading, isFetching } = useOrderGetQuery({
    search: searchValue,
    page,
    per_page,
  });

  const totalOrders = orderData?.data?.total || 0;
  const totalPages = Math.ceil(totalOrders / per_page);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setPage(1);
  };

  const [orderId, setOrderId] = useState<number | null>(null)

  const openModal = (id: number) => {
    console.log(id)
    setOrderId(id)
    setIsModalOpen(true);
  };


  const closeModal = () => setIsModalOpen(false);



  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Search */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h1 className="text-xl font-semibold mb-2">Order List</h1>
        <p className="text-gray-500 mb-4">
          For adding a new song or edit existing song.
        </p>
        <input
          type="text"
          placeholder="Search for Listing"
          className="w-full p-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full bg-white rounded-2xl shadow overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3">Order Number</th>
              <th className="text-left px-4 py-3">User Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Total Amount</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orderData?.data?.data?.map((order: OrderType) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{order.order_number}</td>
                <td className="px-4 py-3">{order.user.full_name}</td>
                <td className="px-4 py-3">{order.user.email}</td>
                <td className="px-4 py-3">{order.total_amount}</td>
                <td className="px-4 py-3">
                  {new Date(order.created_at).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td className="px-4 py-3">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => openModal(order?.id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-3 py-1 rounded ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
            }`}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 rounded ${p === page ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
            }`}
        >
          Next
        </button>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg overflow-y-auto ">
            <OrderDetails orderId={orderId} closeModal={closeModal} />
          </div>
        </div>
      )}

    </div>
  );
};

export default Order;
