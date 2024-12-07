import React, { useEffect, useState } from 'react';
import { DeleteIcon, EditIcon } from '../../../../Assets/Icons/AllIcons';
import { Link } from 'react-router-dom';
import { useGet } from '../../../../Hooks/useGet';
import { LoaderLogin } from '../../../../Components/Components';

const OrdersPaymentHistory = () => {
  const { refetch: refetchOrdersPaymentHistory, loading: loadingOrdersPaymentHistory, data: dataOrdersPaymentHistory } = useGet({ url: 'https://Bcknd.food2go.online/admin/payment/history' });
  const [ordersPaymentHistory, setOrdersPaymentHistory] = useState([]);

  // Fetch Orders Payment History when the component mounts or when refetch is called
  useEffect(() => {
    refetchOrdersPaymentHistory();
  }, [refetchOrdersPaymentHistory]); // Empty dependency array to only call refetch once on mount


  // Update OrdersPayment History when `data` changes
  useEffect(() => {
    if (dataOrdersPaymentHistory && dataOrdersPaymentHistory.orders) {
      setOrdersPaymentHistory(dataOrdersPaymentHistory.orders);
    }
    console.log('OrdersPaymentHistory', ordersPaymentHistory)
  }, [dataOrdersPaymentHistory]); // Only run this effect when `data` changes


  const headers = ['SL', 'Name', "Price", 'Tax (%)'];

  return (
    <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingOrdersPaymentHistory ? (
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
            {ordersPaymentHistory.length === 0 ? (
              <tr>
                <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find orders Payment history</td>
              </tr>
            ) : (


              ordersPaymentHistory.map((paymentHistory, index) => (
                <tr className="w-full border-b-2" key={index}>
                  <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {index + 1}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {paymentHistory?.name || '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {paymentHistory?.price || '0'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {paymentHistory.tax?.amount || '0'}
                    {paymentHistory.tax?.type === "precentage" && (
                      ' %'
                    )}
                  </td>
                  {/* <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link to={`edit/${paymentHistory.id}`} className="text-blue-500 hover:underline"><EditIcon /></Link>
                      <button className="text-red-500" onClick={() => handleDelete(paymentHistory.id, paymentHistory.name)}><DeleteIcon /></button>
                    </div>
                  </td> */}
                </tr>
              ))

            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersPaymentHistory;
