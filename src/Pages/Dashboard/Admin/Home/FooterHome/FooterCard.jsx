import React from "react";
import { Link } from "react-router-dom";

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
          <div className="w-full h-[170px] flex flex-col gap-y-4 pb-2 overflow-y-scroll scrollDrop">
            {topSelling.length === 0 ? (
              <div className="w-full h-4/5 text-center flex items-center justify-center font-TextFontMedium text-xl text-mainColor">
                Not Top Selling Products Found
              </div>
            ) : (
              topSelling.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center space-x-4 p-4 gap-3 rounded-xl shadow-md border-b-2 border-gray-300"
                >
                  <img
                    src={order.image_link}
                    loading="lazy"
                    alt="Product"
                    className="w-20 h-25 rounded-xl object-cover object-center"
                  />
                  <div className="flex flex-col items-start w-full">
                    <p className="font-TextFontMedium text-sm">{order.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {order.description}
                    </p>
                    <p className="text-lg font-TextFontMedium text-mainColor">
                      {order.price} EGP
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        );
      }
      case "Deals": {
        return (
          <div className="w-full h-[170px] flex flex-col gap-y-4 pb-2 overflow-y-scroll scrollDrop">
            {offers.length === 0 ? (
              <div className="w-full h-4/5 text-center flex items-center justify-center font-TextFontMedium text-xl text-mainColor">
                Not Deals Found
              </div>
            ) : (
              offers.map((offer) => (
                <div className="w-full flex flex-col gap-y-2 py-3 shadow-md rounded-2xl"
                  key={offer.id}>
                  <div className="flex justify-start w-full px-3">
                    <div className="w-3/12">
                      <img
                        src={offer.image_link}
                        alt="Offer"
                        loading="lazy"
                        className="w-20 h-20 rounded-full object-cover object-center"
                      />
                    </div>
                    <div className="w-8/12 flex flex-col items-center gap-y-2
                    font-TextFontSemiBold text-4xl text-mainColor">
                      <span>
                        {offer.title}
                      </span>
                      <span>
                        {offer.price} EGP
                      </span>
                    </div>
                  </div>
                  <div className="w-full text-center">
                    <p className="font-TextFontMedium text-gray-500">
                      {offer.description}, {offer.title}
                    </p>
                  </div>
                </div>

              ))
            )}
          </div>
        );
      }
      default:
        return (
          <div className="w-full h-[170px] flex flex-col gap-y-4 px-2 pb-2 overflow-y-scroll scrollDrop">
            {Object.values(topCustomers).length === 0 ? (
              <div className="w-full h-4/5 text-center flex items-center justify-center font-TextFontMedium text-xl text-mainColor">
                Not Customers Found
              </div>
            ) : (
              Object.values(topCustomers).map((customer) => (
                <div
                  key={customer.id}
                  className="w-full flex items-center justify-between gap-x-4 p-4 gap-5 rounded-xl shadow-md border-b-2 border-gray-300 "
                >
                  <div className="w-3/12 flex items-center justify-center">
                    <img
                      src={customer.image_link}
                      loading="lazy"
                      alt="photo"
                      className="w-16 h-16 rounded-full object-cover object-center"
                    />
                  </div>

                  <div className="w-5/12 flex flex-col items-center justify-center">
                    <p className="font-TextFontMedium text-gray-500">{`${customer.name}`}</p>
                    <p className="text-sm text-gray-500">{customer.phone}</p>
                  </div>

                  <span
                    className="w-3/12 flex items-center justify-center text-mainColor"
                  >
                    Order: {customer.orders_count}
                  </span>
                </div>
              ))
            )}
          </div>
        );
    }
  };

  return (
    <div className="sm:w-full  lg:w-[48%] xl:w-[32%] rounded-xl  bg-white py-3 px-4 border border-gray-300 shadow-lg">
      <div className="flex justify-between items-center border-b-2 pb-1 mb-4">
        <h3 className="text-xl font-TextFontSemiBold text-mainColor">{title}</h3>
        <Link
          to={link}
          className="text-sm text-mainColor underline font-TextFontMedium"
        >
          View All
        </Link>
      </div>
      {FooterContent()}
    </div>
  );
};

export default FooterCard;
