import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const orders = [
  {
    id: 1,
    order_number: "100008",
    order_status: "Pending",
    order_date: "28-09-24",
    time: "03:09 PM",
  },
  {
    id: 2,
    order_number: "100009",
    order_status: "Canceled",
    order_date: "29-09-24",
    time: "04:10 PM",
  },
  {
    id: 3,
    order_number: "100010",
    order_status: "Confirmed",
    order_date: "30-09-24",
    time: "05:15 PM",
  },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  canceled: "bg-red-100 text-red-700",
  processing: "bg-blue-100 text-blue-700",
  confirmed: "bg-green-100 text-green-700",
  out_for_delivery: "bg-purple-100 text-purple-700",
};

const FooterCard = ({title}) => {


  return (
    <div className="bg-white py-3 px-4 h-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-1sm font-semibold text-mainColor">{title}</h3>
        <Link to={'/dashboard/orders/all'} className="text-sm text-mainColor underline">
          View All
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="text-center font-TextFontMedium text-mainColor">
          Not Found Orders
        </div>
      ) : (
        <div className="max-h-96 overflow-y-scroll scrollDrop">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-center  py-3 px-2 border-b border-gray-200 last:border-b-0"
            >
              <div >
                <p className="font-medium">
                  Order# {order.id ? order.id : 0}
                </p>
                <p className="text-sm text-gray-500">
                  {order.order_date},{order.time}
                
                </p>
              </div>
              <div
                className={`px-3 py-1  rounded-full text-sm font-medium ${statusColors[order.order_status.toLowerCase().replace(" ", "_")]
                  }`}
              >
                {order.order_status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FooterCard;
