import React from "react";
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

const FooterCard = ({
  title,
  link,
  layout,
  topCustomers,
  topSelling,
  offers,
}) => {
  const FooterContent = () => {
    switch (layout) {
      case "TopSelling": {
        return (
          <div className="space-y-4 h-[200px] overflow-y-auto">
            {topSelling.map((order) => (
              <div
                key={order.id}
                className="flex items-center space-x-4 p-4 gap-3 rounded-lg shadow-sm border-b border-gray-200   transition-all"
              >
                <img
                  src={order.image_link}
                  alt="Product"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 w-full">
                  <p className="font-medium text-sm">{order.name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {order.description}
                  </p>
                  <p className="text-lg font-bold text-red-500">
                    {order.price} EGP
                  </p>
                </div>
              </div>
            ))}
          </div>
        );
      }
      case "Deals": {
        return (
          <div className="flex flex-col items-start space-y-4 h-[200px] overflow-y-auto">
            <div className="flex justify-between w-full  p-4 rounded-lg border-b border-gray-200 ">
              <img
                src={offers.image_link}
                alt="Offer"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="text-right">
                <p className="font-bold text-4xl text-red-700">{offers.price}</p>
                <p className="text-3xl font-bold text-red-700">EGP</p>
              </div>
            </div>
            <div className="text-center">
              <p className="font-medium text-gray-600">
                {offers.description}, {offers.title}
              </p>
            </div>
          </div>
        );
      }
      default:
        return (
          <div className="space-y-4 h-[200px] overflow-y-auto">
            {Object.values(topCustomers).map((order) => (
              <div
                key={order.id}
                className="flex items-start space-x-4 p-4 gap-5 rounded-lg shadow-sm border-b border-gray-200  transition-all"
              >
                <img
                  src={order.image_link}
                  alt="Customer"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-500">{`${order.name}`}</p>
                  <p className="text-sm text-gray-500">{order.phone}</p>
                </div>
                <a
                  className="order cursor-pointer text-red-700 transition-all"
                  href={`#order-${order.id}`}
                >
                  Order: {order.orders_count}
                </a>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:max-w-[30%] rounded-xl h-full bg-white py-3 px-5 border border-gray-300 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-mainColor">{title}</h3>
        <Link
          to={link}
          className="text-sm text-mainColor underline hover:text-mainColor-dark"
        >
          View All
        </Link>
      </div>
      {FooterContent()}
    </div>
  );
};

export default FooterCard;
