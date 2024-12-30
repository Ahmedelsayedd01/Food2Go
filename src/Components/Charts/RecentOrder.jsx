import React from 'react';
import { Link } from 'react-router-dom';

const orders = [
    // { id: 1, number: '100008', status: 'Pending', date: '28-09-24', time: '03:09 PM' },
    // { id: 2, number: '100008', status: 'Canceled', date: '28-09-24', time: '03:09 PM' },
    // { id: 3, number: '100008', status: 'Pending', date: '28-09-24', time: '03:09 PM' },
    // { id: 4, number: '100008', status: 'Processing', date: '28-09-24', time: '03:09 PM' },
    // { id: 5, number: '100008', status: 'Canceled', date: '28-09-24', time: '03:09 PM' },
    // { id: 6, number: '100008', status: 'Processing', date: '28-09-24', time: '03:09 PM' },
];

const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Canceled: 'bg-red-100 text-red-700',
    Processing: 'bg-blue-100 text-blue-700',
};

const RecentOrders = () => {
    return (
        <div className="bg-white p-5 w-full mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#8c0000]">Recent Orders</h3>
                <Link to={'/dashboard/orders/all'} href="#" className="text-sm text-[#8c0000] underline">View All</Link>
            </div>

            {orders.map((order) => (
                <div key={order.id} className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                    <div>
                        <p className="font-medium">Order# {order.number}</p>
                        <p className="text-sm text-gray-500">{order.date}, {order.time}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                        {order.status}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecentOrders;
