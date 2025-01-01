import React, { useEffect } from "react";

const orders = [
  {
    id: 1,
    number: "100008",
    status: "Pending",
    date: "28-09-24",
    time: "03:09 PM",
  },
  {
    id: 2,
    number: "100008",
    status: "Canceled",
    date: "28-09-24",
    time: "03:09 PM",
  },
  {
    id: 3,
    number: "100008",
    status: "Pending",
    date: "28-09-24",
    time: "03:09 PM",
  },
  {
    id: 4,
    number: "100008",
    status: "Processing",
    date: "28-09-24",
    time: "03:09 PM",
  },
  {
    id: 5,
    number: "100008",
    status: "Canceled",
    date: "28-09-24",
    time: "03:09 PM",
  },
  {
    id: 6,
    number: "100008",
    status: "Confirmed",
    date: "28-09-24",
    time: "03:09 PM",
  },
  {
    id: 7,
    number: "100008",
    status: "Out for Delivery",
    date: "28-09-24",
    time: "03:09 PM",
  },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  canceled: "bg-red-100 text-red-700",
  processing: "bg-blue-100 text-blue-700",
  confirmed: "bg-green-100 text-green-700",
  out_for_delivery: "bg-purple-100 text-purple-700",
};

const RecentOrders = ({ recent_orders }) => {
  useEffect(() => {
    console.log("Data order in recent orders: ", recent_orders);
  }, [recent_orders]);

  return (
    <div className="bg-white p-5 w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[#8c0000]">Recent Orders</h3>
        <a href="#" className="text-sm text-[#8c0000] underline">
          View All
        </a>
      </div>

      <div className="max-h-80 overflow-y-scroll">
        {recent_orders.map((order) => (
          <div
            key={order.id}
            className="flex justify-between items-center  py-8 px-4 border-b border-gray-200 last:border-b-0"
          >
            <div >
              <p className="font-medium">
                Order# {order.order_number ? order.order_number : 0}
              </p>
              <p className="text-sm text-gray-500">
                {order.order_date},{" "}
                {(() => {
                  const [hour, minute] = order.date.split(":").map(Number);
                  const period = hour >= 12 ? "PM" : "AM";
                  const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM/PM
                  return `${formattedHour}:${
                    minute < 10 ? "0" + minute : minute
                  } ${period}`;
                })()}
              </p>
            </div>
            <div
              className={`px-3 py-1  rounded-full text-sm font-medium ${
                statusColors[order.order_status.toLowerCase().replace(" ", "_")]
              }`}
            >
              {order.order_status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
