import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { LoaderLogin, SearchBar } from '../../../../../Components/Components';
import { BiSolidShow } from 'react-icons/bi';
import { FaFileInvoice } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProcessingOrdersPage = () => {
  const ordersProcessing = useSelector((state) => state.ordersProcessing);
  const [textSearch, setTextSearch] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const filteredOrdersPerPage = 20; // Limit to 20 filteredOrders per page

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredOrders.length / filteredOrdersPerPage);

  // Get the filteredOrders for the current page
  const currentFilteredOrders = filteredOrders.slice(
    (currentPage - 1) * filteredOrdersPerPage,
    currentPage * filteredOrdersPerPage
  );

  // handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (Array.isArray(ordersProcessing.data)) {
      setFilteredOrders(ordersProcessing.data)
      console.log('ordersProcessing', ordersProcessing.data);
    } else {
      console.log('ordersProcessing data is not an array or is undefined');
    }
  }, [ordersProcessing.data]);

  const handleFilterData = (e) => {
    let text = e.target.value;
    setTextSearch(text);


    if (text == '') {
      setFilteredOrders(ordersProcessing.data)
    } else {

      const filter = ordersProcessing.data.filter((order) =>
        order.id === Number(text) ||
        order.order_status.toLowerCase().includes(text.toLowerCase())
      )
      setFilteredOrders(filter);
      console.log('filter', filter)
    }


    console.log('text', text)
  };

  const headers = [
    'SL',
    'Order ID',
    'Delivery Date',
    'Customer Info',
    'Branch',
    "Total Amount",
    'Order Status',
    'Order Type',
    'Actions'
  ];
  return (
    <>
      <div className="w-full flex flex-col gap-y-3">
        {/* Search Order */}
        <div className="sm:w-full lg:w-[70%] xl:w-[30%] mt-4">
          <SearchBar
            placeholder='Search by Order ID, Order Status'
            value={textSearch}
            handleChange={handleFilterData}
          />
        </div>
        {/* Orders Table */}
        <div className="w-full pb-28 overflow-x-auto">
          {ordersProcessing.loading ? (
            <LoaderLogin />
          ) : (
            <div className='w-full flex flex-col'>
              <table className="w-full sm:min-w-0 block overflow-x-scroll scrollPage border-collapse">
                {/* Table Header */}
                <thead>
                  <tr className="border-b-2">
                    {headers.map((name, index) => (
                      <th
                        key={index}
                        className="px-4 py-2 min-w-[120px] text-mainColor text-center font-TextFontSemiBold text-sm lg:text-base"
                      >
                        {name}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td
                        colSpan={headers.length}
                        className="py-4 text-center text-mainColor text-lg font-TextFontMedium"
                      >
                        No orders found
                      </td>
                    </tr>
                  ) : (
                    currentFilteredOrders.map((order, index) => (
                      <tr key={index} className="border-b">
                        {/* Row Index */}
                        <td className="px-4 py-2 text-center text-thirdColor text-sm lg:text-base">
                          {(currentPage - 1) * filteredOrdersPerPage + index + 1}
                        </td>

                        {/* Order ID */}
                        <td className="px-4 py-2 text-center text-thirdColor text-sm lg:text-base">
                          <Link
                            to={`/dashboard/orders/details/${order.id}`}
                            className="text-secoundColor underline hover:text-mainColor text-xl font-TextFontMedium transition ease-in-out duration-200"
                          >
                            {order.id}
                          </Link>
                        </td>

                        {/* Order Date */}
                        <td className="px-4 py-2 text-center text-thirdColor text-sm lg:text-base">
                          {order?.created_at
                            ? new Date(order.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true,
                            })
                            : ''}
                        </td>

                        {/* User Information */}
                        <td className="px-4 py-2 text-center text-thirdColor text-sm lg:text-base">
                          <div>{`${order.user?.f_name || 'N/A'} ${order.user?.l_name || '-'
                            }`}</div>
                          <div>{order.user?.phone || 'No Phone'}</div>
                        </td>

                        {/* Branch */}
                        <td className="px-4 py-2 text-center text-sm lg:text-base">
                          <span className="text-cyan-500 bg-cyan-200 rounded-md px-2 py-1">
                            {order.branch?.name || '-'}
                          </span>
                        </td>

                        {/* Order Amount */}
                        <td className="px-4 py-2 text-center text-thirdColor text-sm lg:text-base">
                          {order?.amount || '-'}
                        </td>

                        {/* Order Status */}
                        <td className="px-4 py-2 text-center">
                          <span
                            className={`rounded-md px-2 py-1 text-sm ${order?.order_status === 'pending'
                              ? 'bg-amber-200 text-amber-500'
                              : order?.order_status === 'confirmed'
                                ? 'bg-green-200 text-green-500'
                                : order?.order_status === 'canceled'
                                  ? 'bg-red-200 text-red-500'
                                  : 'bg-gray-200 text-gray-500'
                              }`}
                          >
                            {order?.order_status || '-'}
                          </span>
                        </td>

                        {/* Order Type */}
                        <td className="px-4 py-2 text-center">
                          <span
                            className={`rounded-md px-2 py-1 text-sm ${order?.order_type === 'delivery'
                              ? 'bg-green-300 text-green-500'
                              : order?.order_type === 'pickup'
                                ? 'bg-blue-300 text-blue-500'
                                : 'bg-gray-200 text-gray-500'
                              }`}
                          >
                            {order?.order_type || '-'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-2 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              to={`/dashboard/orders/details/${order.id}`}
                              aria-label="View Details"
                              className="border-mainColor border-2 p-2 rounded-md "
                            >
                              <BiSolidShow className="text-xl text-mainColor" />
                            </Link>
                            <Link
                              to={`/dashboard/orders/invoice/${order.id}`}
                              aria-label="View Invoice"
                              className="border-green-400 border-2 p-2 rounded-md "
                            >
                              <FaFileInvoice className="text-xl text-green-400" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {filteredOrders.length > 0 && (
                <div className="my-6 flex flex-wrap items-center justify-center gap-x-4">
                  {currentPage !== 1 && (
                    <button type='button' className='text-lg px-4 py-2 rounded-xl bg-mainColor text-white font-TextFontMedium' onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 mx-1 text-lg font-TextFontSemiBold rounded-full duration-300 ${currentPage === page ? 'bg-mainColor text-white' : ' text-mainColor'}`}
                    >
                      {page}
                    </button>
                  ))}
                  {totalPages !== currentPage && (
                    <button type='button' className='text-lg px-4 py-2 rounded-xl bg-mainColor text-white font-TextFontMedium' onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

      </div>

    </>
  )
}

export default ProcessingOrdersPage