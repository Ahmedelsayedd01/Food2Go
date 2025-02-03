import React, { useEffect, useState } from 'react';
import { DeleteIcon, EditIcon } from '../../../../Assets/Icons/AllIcons';
import { Link } from 'react-router-dom';
import { useGet } from '../../../../Hooks/useGet';
import { LoaderLogin, TextInput } from '../../../../Components/Components';
import { useChangeState } from '../../../../Hooks/useChangeState';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useAuth } from '../../../../Context/Auth';

const OrdersPaymentPending = () => {
  const auth = useAuth()
  const [orderId, setOrderId] = useState('');

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { refetch: refetchOrdersPaymentPending, loading: loadingOrdersPaymentPending, data: dataOrdersPaymentPending } = useGet({ url: `${apiUrl}/admin/payment/pending` });
  const { refetch: refetchReceiptImage, loading: loadingReceiptImage, data: dataReceiptImage } = useGet({ url: `${apiUrl}/admin/payment/receipt/${orderId}` });

  const { changeState, loadingChange, responseChange } = useChangeState();
  const [ordersPaymentPending, setOrdersPaymentPending] = useState([]);
  const [reasonReject, setReasonReject] = useState('');

  const [receiptImage, setReceiptImage] = useState('');
  const [openReceipt, setOpenReceipt] = useState(null);
  const [openReject, setOpenReject] = useState(null);


  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const ordersPaymentPendingPerPage = 20; // Limit to 20 ordersPaymentPending per page

  // Calculate total number of pages
  const totalPages = Math.ceil(ordersPaymentPending.length / ordersPaymentPendingPerPage);

  // Get the ordersPaymentPending for the current page
  const currentOrdersPaymentPending = ordersPaymentPending.slice(
    (currentPage - 1) * ordersPaymentPendingPerPage,
    currentPage * ordersPaymentPendingPerPage
  );

  // handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  // Fetch Orders Payment Pending when the component mounts or when refetch is called
  useEffect(() => {
    refetchOrdersPaymentPending();
  }, [refetchOrdersPaymentPending]); // Empty dependency array to only call refetch once on mount

  useEffect(() => {
    if (orderId) {
      refetchReceiptImage();
    }
  }, [orderId, refetchReceiptImage]);

  const handleOpenReceipt = (id) => {
    setOrderId(id);
    setOpenReceipt(id);
  };

  const handleCloseReceipt = () => {
    setReceiptImage('');
    setOpenReceipt(null);
  };


  const handleOpenReject = (orderId) => {
    setOpenReject(orderId);

  };
  const handleCloseReject = () => {
    setOpenReject(null);
  };

  // Update OrdersPayment Pending when `data` changes
  useEffect(() => {
    if (dataOrdersPaymentPending && dataOrdersPaymentPending.orders) {
      setOrdersPaymentPending(dataOrdersPaymentPending.orders);
    }
    console.log('OrdersPaymentPending', ordersPaymentPending)
  }, [dataOrdersPaymentPending]); // Only run this effect when `data` changes

  // Update OrdersPayment Pending when `data` changes
  useEffect(() => {
    if (dataReceiptImage && dataReceiptImage.receipt.receipt) {
      // Assuming receipt is an object with a 'data' field that contains the base64 string
      const base64Receipt =
        typeof dataReceiptImage.receipt.receipt === 'string'
          ? dataReceiptImage.receipt.receipt
          : dataReceiptImage.receipt.receipt;
      if (base64Receipt) {
        setReceiptImage(base64Receipt);
      } else {
        console.error('Receipt data is not valid:', dataReceiptImage.receipt.receipt);
      }
    }
  }, [dataReceiptImage]);

  const handleApprove = async (id) => {
    const response = await changeState(
      `${apiUrl}/admin/payment/approve/${id}`,
      `${id} Is Approved.`
    );
    if (response) {
      setOrdersPaymentPending((prevPaymentPending) =>
        prevPaymentPending.filter((PaymentPending) =>
          PaymentPending.id !== id)
      );
    }
  };

  const handleReject = async (id) => {
    if (!reasonReject) {
      auth.toastError('please set your reason reject')
      return;
    }

    const response = await changeState(
      `${apiUrl}/admin/payment/rejected/${id}`,
      `${id} Is Rejected.`,
      { rejected_reason: reasonReject }
    );

    if (response) {
      setOrdersPaymentPending((prevPaymentPending) =>
        prevPaymentPending.filter((PaymentPending) =>
          PaymentPending.id !== id)
      );
    }
  };

  const headers = ['SL', 'Name', 'Phone', 'Total Order', 'Resipt', 'Order Num', 'Order Date', 'Price', 'Tax (%)', 'Action'];

  return (
    <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingOrdersPaymentPending || loadingChange ? (
        <>
          <div className="mx-auto">
            <LoaderLogin />
          </div>
        </>
      ) : (
        <div className='w-full flex flex-col'>
          <table className="w-full sm:min-w-0 block overflow-x-scroll scrollPage">
            <thead className="w-full">
              <tr className="w-full border-b-2">
                {headers.map((name, index) => (
                  <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3" key={index}>
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="w-full">
              {ordersPaymentPending.length === 0 ? (
                <tr>
                  <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium'>Not Find Orders Payment Pending</td>
                </tr>
              ) : (

                currentOrdersPaymentPending.map((paymentPending, index) => ( // Example with two rows
                  <tr className="w-full border-b-2" key={index}>
                    <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      {(currentPage - 1) * ordersPaymentPendingPerPage + index + 1}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      {paymentPending?.user?.name || '-'}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      {paymentPending?.user?.phone || '-'}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      {paymentPending?.user?.order_amount || '-'}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      {/* <div className="flex justify-center">
                        <img src={paymentPending?.receipt_link}
                          className="bg-mainColor border-2 border-mainColor rounded-full min-w-14 min-h-14 max-w-14 max-h-14"
                          alt="Photo"
                        />
                      </div> */}
                      <span className='text-mainColor text-xl border-b-2 border-mainColor font-TextFontSemiBold cursor-pointer'
                        onClick={() => handleOpenReceipt(paymentPending.id)}>
                        View
                      </span>
                      {openReceipt === paymentPending.id && (
                        <Dialog open={true} onClose={handleCloseReceipt} className="relative z-10">
                          <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">

                                {/* Permissions List */}
                                {/* <div className="w-full flex flex-col items-start justify-center gap-4 my-4 px-4 sm:p-6 sm:pb-4">
                                  sdf
                                </div> */}
                                <div className="w-full flex justify-center items-center">
                                  {loadingReceiptImage ? (
                                    <LoaderLogin
                                      mt={0}
                                    />
                                  ) : (
                                    <div className="w-full p-5  ">
                                      <img
                                        src={receiptImage ? `data:image/jpeg;base64,${receiptImage}` : ''}
                                        className="w-full h-full object-center object-contain shadow-md rounded-2xl"
                                        alt="Receipt"
                                      />

                                    </div>
                                  )
                                  }
                                </div>

                                {/* Dialog Footer */}
                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-x-3">
                                  <button
                                    type="button"
                                    onClick={handleCloseReceipt}
                                    className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-TextFontMedium text-white sm:mt-0 sm:w-auto"
                                  >
                                    Close
                                  </button>
                                </div>

                              </DialogPanel>
                            </div>
                          </div>
                        </Dialog>
                      )}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      {paymentPending?.order_number || '-'}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      {paymentPending?.order_date ? (
                        <>
                          {paymentPending.order_date}
                          <br />
                          {paymentPending.date}
                        </>
                      ) : (
                        '-'
                      )}
                    </td>

                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      {paymentPending?.amount || '0'}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      {paymentPending.tax?.amount || '0'}
                      {paymentPending.tax?.type === "precentage" && (
                        ' %'
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="text-green-500 text-xl" onClick={() => handleApprove(paymentPending.id)}>
                          <FaCheck />
                        </button>
                        <button className="text-red-500 text-xl" onClick={() => handleOpenReject(paymentPending.id)}>
                          <FaTimes />
                        </button>
                        {/* <span className='text-mainColor text-xl border-b-2 border-mainColor font-TextFontSemiBold cursor-pointer'
                        onClick={() => handleOpenReject(paymentPending.id)}>
                        View
                      </span> */}
                      </div>

                      {openReject === paymentPending.id && (
                        <Dialog open={true} onClose={handleCloseReject} className="relative z-10">
                          <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">

                                {/* Permissions List */}
                                <div className="w-full flex flex-col items-start justify-center gap-4 my-4 px-4 sm:p-6 sm:pb-4">
                                  <span>Reason Reject:</span>
                                  {/* <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center"> */}
                                  <TextInput
                                    value={reasonReject} // Access category_name property
                                    onChange={(e) => setReasonReject(e.target.value)}
                                    placeholder="Reason Reject"
                                  />
                                  {/* </div> */}
                                </div>

                                {/* Dialog Footer */}
                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-x-3">
                                  <button
                                    type="button"
                                    onClick={handleCloseReject}
                                    className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-TextFontMedium text-white sm:mt-0 sm:w-auto"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleReject(paymentPending.id, paymentPending.id)}
                                    className="inline-flex w-full justify-center rounded-md bg-green-500 px-6 py-3 text-sm font-TextFontMedium text-white sm:mt-0 sm:w-auto"
                                  >
                                    Reject
                                  </button>
                                </div>

                              </DialogPanel>
                            </div>
                          </div>
                        </Dialog>
                      )}
                    </td>
                  </tr>
                ))

              )}
            </tbody>
          </table>
          {ordersPaymentPending.length > 0 && (
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
  );
};

export default OrdersPaymentPending;
