import React, { useState } from "react";
import { useAllNotificationQuery, useAllNotificationReadMutation, useNotificationReadMutation } from "../../redux/dashboardFeatures/Order/orderSlice";
import { message } from "antd";

type Notification = {
    id: string;
    type: string;
    notifiable_type: string;
    notifiable_id: number;
    data: {
        title: string;
        email: string;
        type: string;
        message: string;
    };
    read_at: string | null;
    created_at: string;
    updated_at: string;
};

const Notification: React.FC = () => {


    const { data } = useAllNotificationQuery(undefined);

    console.log("-----notification is ", data);

    const allNotifications = data?.data?.data || [];


    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;

    const totalPages = Math.ceil(allNotifications.length / perPage);

    const paginatedData = allNotifications.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    const [notificationRead] = useNotificationReadMutation();
    const [allNotificationRead] = useAllNotificationReadMutation()

    const markAsRead = async (id: string) => {

        try {
            const res = await notificationRead(id);
            console.log(res)
            if (res) {
                message.success(res?.data?.message)
            }
        } catch (error) {
            message.error(error?.data?.message || 'Something went wrong');
        }

    };

    const clearAll = async () => {
        try {
            const res = await allNotificationRead(undefined);
            console.log(res)
            if (res) {
                message.success(res?.data.message)
            }
        } catch (error) {
            console.log(error)
            message.error(error?.data?.message || 'Something went wrong');
        }
    };

    const unreadNotifications = allNotifications.filter(n => n.read_at === null);
    const unreadCount = unreadNotifications.length;

    console.log("---------------------------------------",unreadCount)

    return (
        <div className="min-h-screen flex flex-col items-center p-6">
            {/* Header */}
            <div className="w-full  flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
                <button
                    onClick={clearAll}
                    className="text-sm px-3 py-1 rounded  bg-yellow-400 "
                >
                    Read All
                </button>
            </div>

            {/* Notifications List */}
            <div className="w-full  ">
                {paginatedData.length > 0 ? (
                    paginatedData.map((n) => (
                        <div
                            key={n.id}
                            onClick={() => n.read_at === null && markAsRead(n.id)}
                            className={`p-4 transition rounded my-4
    ${n.read_at === null
                                    ? "bg-black text-white cursor-pointer hover:bg-gray-800"
                                    : "bg-white text-black cursor-not-allowed opacity-70"
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <h2 className={`font-semibold ${n.read_at === null ? "text-white" : "text-black"}`}>
                                    {/* {n.data.title} ({n.data.type}) */}
                                </h2>
                                <span className={`text-xs ${n.read_at === null ? "text-gray-300" : "text-gray-500"}`}>
                                    {new Date(n.created_at).toLocaleString()}
                                </span>
                            </div>
                            <p className="text-sm mt-1">{n.data.message}</p>
                            <p className="text-xs mt-1">{n.data.email}</p>
                        </div>
                    ))
                ) : (
                    <div className="p-6 text-center text-gray-500">
                        No notifications available
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center space-x-2 mt-6">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>

                    {[...Array(totalPages)].map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentPage(idx + 1)}
                            className={`px-3 py-1 rounded ${currentPage === idx + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                                }`}
                        >
                            {idx + 1}
                        </button>
                    ))}

                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Notification;
