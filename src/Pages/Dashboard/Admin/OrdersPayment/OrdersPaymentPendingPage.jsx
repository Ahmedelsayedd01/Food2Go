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
  const { refetch: refetchOrdersPaymentPending, loading: loadingOrdersPaymentPending, data: dataOrdersPaymentPending } = useGet({ url: 'https://Bcknd.food2go.online/admin/payment/pending' });
  const { changeState, loadingChange, responseChange } = useChangeState();
  const [ordersPaymentPending, setOrdersPaymentPending] = useState([]);
  const [reasonReject, setReasonReject] = useState('');
  const [openReject, setOpenReject] = useState(null);

  // Fetch Orders Payment Pending when the component mounts or when refetch is called
  useEffect(() => {
    refetchOrdersPaymentPending();
  }, [refetchOrdersPaymentPending]); // Empty dependency array to only call refetch once on mount

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

  const handleApprove = async (id) => {
    const response = await changeState(
      `https://Bcknd.food2go.online/admin/payment/approve/${id}`,
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
      `https://Bcknd.food2go.online/admin/payment/rejected/${id}`,
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

  const headers = ['SL', 'Name', "Price", 'Tax (%)', 'Action'];

  return (
    <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingOrdersPaymentPending || loadingChange ? (
        <>
          <div className="mx-auto">
            <LoaderLogin />
          </div>
        </>
      ) : (
        <table className="w-full sm:min-w-0">
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

              ordersPaymentPending.map((paymentPending, index) => ( // Example with two rows
                <tr className="w-full border-b-2" key={index}>
                  <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {index + 1}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {paymentPending?.name || '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {paymentPending?.price || '0'}
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
                      {/* <span className='text-mainColor text-xl border-b-2 border-mainColor font-semibold cursor-pointer'
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
                                  className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-medium text-white sm:mt-0 sm:w-auto"
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleReject(paymentPending.id, paymentPending.id)}
                                  className="inline-flex w-full justify-center rounded-md bg-green-500 px-6 py-3 text-sm font-medium text-white sm:mt-0 sm:w-auto"
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
      )}
    </div>
  );
};

export default OrdersPaymentPending;