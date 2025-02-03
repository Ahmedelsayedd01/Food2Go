import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import { useGet } from '../../../../../Hooks/useGet';
import { DropDown, LoaderLogin, SearchBar, TextInput } from '../../../../../Components/Components';
import { FaClock, FaUser } from 'react-icons/fa';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { usePost } from '../../../../../Hooks/usePostJson';
import { useChangeState } from '../../../../../Hooks/useChangeState';

const DetailsOrderPage = () => {
       const StatusRef = useRef(null)
       const { orderId } = useParams();
       const location = useLocation();
       const pathOrder = location.pathname;
       const orderNumPath = pathOrder.split('/').pop();
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { refetch: refetchDetailsOrder, loading: loadingDetailsOrder, data: dataDetailsOrder } = useGet({ url: `${apiUrl}/admin/order/order/${orderNumPath}` });
       const { postData, loadingPost, response } = usePost({
              url: `${apiUrl}/admin/order/delivery`
       });
       const { changeState, loadingChange, responseChange } = useChangeState();

       const [detailsData, setDetailsData] = useState([])
       const [orderStatus, setOrderStatus] = useState([])
       const [deliveries, setDeliveries] = useState([])
       const [deliveriesFilter, setDeliveriesFilter] = useState([])


       const [isOpenOrderStatus, setIsOpenOrderStatus] = useState(false)

       const [orderStatusName, setOrderStatusName] = useState('')
       const [searchDelivery, setSearchDelivery] = useState('')

       const [preparationTime, setPreparationTime] = useState({})

       const [orderNumber, setOrderNumber] = useState('')

       const [openReceipt, setOpenReceipt] = useState(null);
       const [openOrderNumber, setOpenOrderNumber] = useState(null);
       const [openDeliveries, setOpenDeliveries] = useState(null);

       useEffect(() => {
              refetchDetailsOrder();
       }, [orderNumPath]);

       useEffect(() => {
              refetchDetailsOrder(); // Refetch data when the component mounts or orderId or path changes
       }, [refetchDetailsOrder, orderId, location.pathname]);

       useEffect(() => {
              if (dataDetailsOrder && dataDetailsOrder?.order) {
                     setDetailsData(dataDetailsOrder?.order)
                     setOrderStatusName(dataDetailsOrder?.order?.order_status)
                     const formattedOrderStatus = dataDetailsOrder?.order_status.map(status => ({ name: status }));

                     setOrderStatus(formattedOrderStatus); // Update state with the transformed data
                     setDeliveries(dataDetailsOrder?.deliveries)
                     setDeliveriesFilter(dataDetailsOrder?.deliveries)
                     setPreparationTime(dataDetailsOrder?.preparing_time)
              }

              console.log('dataDetailsOrder', dataDetailsOrder); // Refetch data when the component mounts
              console.log('detailsData', detailsData); // Refetch data when the component mounts
              console.log('OrderStatus', orderStatus); // Refetch data when the component mounts
       }, [dataDetailsOrder]);
       useEffect(() => {
              console.log('orderId', orderId); // Refetch data when the component mounts
       }, [orderId]);


       const timeString = dataDetailsOrder?.order?.date || '';
       const [olderHours, olderMinutes] = timeString.split(':').map(Number); // Extract hours and minutes as numbers
       const dateObj = new Date();
       dateObj.setHours(olderHours, olderMinutes);

       const dayString = dataDetailsOrder?.order?.order_date || '';
       const [olderyear, olderMonth, olderDay] = dayString.split('-').map(Number); // Extract year, month, and day as numbers
       const dayObj = new Date();
       dayObj.setFullYear(olderyear);
       dayObj.setMonth(olderMonth - 1); // Months are zero-based in JavaScript Date
       dayObj.setDate(olderDay);

       // Create a new Date object for the current date and time
       const time = new Date();

       // Extract time components using Date methods
       const day = time.getDate();
       const hour = time.getHours();
       const minute = time.getMinutes();
       const second = time.getSeconds();


       // If you need to modify the time object (not necessary here):
       time.setDate(day);
       time.setHours(hour);
       time.setMinutes(minute);
       time.setSeconds(second);

       // Create an object with the extracted time values
       const initialTime = {
              currentDay: day,
              currentHour: hour,
              currentMinute: minute,
              currentSecond: second,
       };



       const handleChangeDeliveries = (e) => {
              const value = e.target.value.toLowerCase(); // Normalize input value
              setSearchDelivery(value);

              const filterDeliveries = deliveries.filter((delivery) =>
                     (delivery.f_name + " " + delivery.l_name).toLowerCase().includes(value) // Concatenate and match
              );

              setDeliveriesFilter(filterDeliveries);

              console.log('filterDeliveries', filterDeliveries);
       };

       const handleAssignDelivery = (deliveryID, orderID, deliveryNumber) => {
              const formData = new FormData();
              formData.append('delivery_id', deliveryID)
              formData.append('order_id', orderID)
              formData.append('order_number', deliveryNumber)

              postData(formData, 'Delivery has Assigned')
       }
       useEffect(() => {
              if (response && response.status === 200) {
                     setOrderStatusName('out_for_delivery')
                     setSearchDelivery('');
                     setOpenDeliveries(false);
                     setDeliveriesFilter(deliveries);
              }
              console.log('response', response)
       }, [response]);

       const handleOpenReceipt = (id) => {
              setOpenReceipt(id);
       };

       const handleCloseReceipt = () => {
              setOpenReceipt(null);
       };

       const handleOpenOrderNumber = (orderId) => {
              setOpenOrderNumber(orderId);
       };
       const handleCloseOrderNumber = () => {
              setOpenOrderNumber(null);
       };


       const handleOpenDeliviers = (deliveryId) => {
              setOpenDeliveries(deliveryId);
       };

       const handleCloseDeliveries = () => {
              setOpenDeliveries(null);
       };

       const handleOpenOrderStatus = () => {
              setIsOpenOrderStatus(!isOpenOrderStatus);
       };
       const handleOpenOptionOrderStatus = () => setIsOpenOrderStatus(false);

       const handleSelectOrderStatus = (option) => {
              if (!option) return;

              // setOrderStatusName(option.name);

              // Call handleChangeStaus with appropriate arguments

              // if (option.name === 'processing') {
              //        handleOpenOrderNumber(detailsData.id)
              // } else {
              setOrderStatusName(option.name);
              handleChangeStaus(detailsData.id, '', option.name);
              // }
       };

       const handleOrderNumber = (id) => {
              if (!orderNumber) {
                     auth.toastError('please set your order Number')
                     return;
              }

              handleChangeStaus(id, orderNumber, 'processing');
              setOpenOrderNumber(null);
       };

       // Move handleChangeStaus outside the function
       const handleChangeStaus = async (orderId, orderNumber, orderStatus) => {
              try {
                     const responseStatus = await changeState(
                            `${apiUrl}/admin/order/status/${orderId}`,
                            `Changed Status Successes.`,
                            {
                                   order_status: orderStatus,
                                   order_number: orderNumber
                            }
                     );

                     if (responseStatus) {
                            refetchDetailsOrder(); // Refetch the order details after successful status change
                     }
              } catch (error) {
                     console.error('Error changing status:', error);
              }
       };


       useEffect(() => {
              const countdown = setInterval(() => {
                     setPreparationTime((prevTime) => {
                            if (!prevTime) return prevTime;

                            const { days, hours, minutes, seconds } = prevTime;

                            // Calculate the next time
                            let newSeconds = seconds - 1;
                            let newMinutes = minutes;
                            let newHours = hours;
                            let newDays = days;

                            if (newSeconds < 0) {
                                   newSeconds = 59;
                                   newMinutes -= 1;
                            }
                            if (newMinutes < 0) {
                                   newMinutes = 59;
                                   newHours -= 1;
                            }
                            if (newHours < 0) {
                                   newHours = 23;
                                   newDays -= 1;
                            }

                            // Stop the countdown if time reaches zero
                            if (newDays <= 0 && newHours <= 0 && newMinutes <= 0 && newSeconds <= 0) {
                                   clearInterval(countdown);
                                   return { days: 0, hours: 0, minutes: 0, seconds: 0 };
                            }

                            return { days: newDays, hours: newHours, minutes: newMinutes, seconds: newSeconds };
                     });
              }, 1000);

              // Clear interval on unmount
              return () => clearInterval(countdown);
       }, []); // Dependency array is empty to ensure the effect runs only once


       let totalAddonPrice = 0;
       let totalItemPrice = 0;

       useEffect(() => {
              const handleClickOutside = (event) => {
                     // Close dropdown if clicked outside
                     if (
                            StatusRef.current && !StatusRef.current.contains(event.target)
                     ) {
                            setIsOpenOrderStatus(false);
                     }
              };

              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);

       return (
              <>
                     {loadingDetailsOrder || loadingPost || loadingChange ? (
                            <div className="mx-auto">
                                   <LoaderLogin />
                            </div>
                     ) : (
                            <>

                                   {
                                          detailsData.length === 0 ? (
                                                 <div className="mx-auto">
                                                        <LoaderLogin />
                                                 </div>
                                          ) : (

                                                 <div className="w-full flex sm:flex-col lg:flex-row items-start justify-between gap-5 mb-24">
                                                        {/* Left Section */}
                                                        <div className="sm:w-full lg:w-8/12">
                                                               <div className="w-full bg-white rounded-xl shadow-md p-4 ">

                                                                      {detailsData.length === 0 ? (
                                                                             <div>
                                                                                    <LoaderLogin />
                                                                             </div>
                                                                      ) : (
                                                                             <div className="w-full">
                                                                                    {/* Header */}
                                                                                    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 shadow rounded-lg">
                                                                                           {/* Header */}
                                                                                           <div className="flex flex-col justify-between items-start border-b border-gray-300 pb-4 mb-4">
                                                                                                  <div className="w-full">
                                                                                                         <div className="w-full flex flex-wrap items-center justify-between">
                                                                                                                <h1 className="text-2xl font-TextFontMedium text-gray-800">Order <span className='text-mainColor'>#{detailsData?.order_number || ''}</span></h1>
                                                                                                                <div className="sm:w-full lg:w-6/12 flex items-center justify-center gap-2">
                                                                                                                       <Link
                                                                                                                              to={`/dashboard/orders/details/${Number(orderNumPath) - 1}`}
                                                                                                                              className='w-6/12 text-center text-xl text-white bg-mainColor border-2 border-mainColor px-4 py-1 rounded-lg transition-all ease-in-out duration-300  hover:bg-white hover:text-mainColor'
                                                                                                                       >
                                                                                                                              {'<<'} Prev Order
                                                                                                                       </Link>
                                                                                                                       <Link
                                                                                                                              to={`/dashboard/orders/details/${Number(orderNumPath) + 1}`}
                                                                                                                              className='w-6/12 text-center text-xl text-white bg-mainColor border-2 border-mainColor px-4 py-1 rounded-lg transition-all ease-in-out duration-300  hover:bg-white hover:text-mainColor'
                                                                                                                       >
                                                                                                                              Next Order {'>>'}
                                                                                                                       </Link>
                                                                                                                </div>

                                                                                                         </div>
                                                                                                         <p className="text-sm text-gray-700 mt-1">
                                                                                                                <span className="font-TextFontSemiBold">Branch:</span> {detailsData?.branch?.address || ''}
                                                                                                         </p>
                                                                                                         <p className="text-sm text-gray-700 mt-1">
                                                                                                                <span className="font-TextFontSemiBold">Order Date & Time:</span> {detailsData?.order_date || ''} / {detailsData?.date || ''}
                                                                                                         </p>
                                                                                                  </div>
                                                                                           </div>

                                                                                           {/* Order Information */}
                                                                                           <div className="w-full flex sm:flex-col xl:flex-row justify-center items-start gap-4">
                                                                                                  <div className="sm:w-full xl:w-6/12   bg-white p-4 shadow-md rounded-md">
                                                                                                         <p className="text-xl text-gray-800">
                                                                                                                <span className="font-TextFontSemiBold text-mainColor">Status:</span> {detailsData?.order_status || ''}
                                                                                                         </p>
                                                                                                         <p className="text-xl text-gray-800 mt-2">
                                                                                                                <span className="font-TextFontSemiBold text-mainColor">Payment Method:</span> {detailsData?.payment_method?.name || ''}
                                                                                                         </p>
                                                                                                         <p className="text-xl text-gray-800 mt-2">
                                                                                                                <span className="font-TextFontSemiBold text-mainColor">Payment Status:</span> {detailsData?.status_payment || ''}
                                                                                                                <span className="text-green-600 font-TextFontSemiBold ml-1">{detailsData?.payment_status || ''}</span>
                                                                                                         </p>
                                                                                                  </div>
                                                                                                  <div className="sm:w-full xl:w-6/12   bg-white p-4 shadow-md rounded-md">
                                                                                                         <p className="text-xl text-gray-800">
                                                                                                                <span className="font-TextFontSemiBold text-mainColor">Order Type:</span> {detailsData?.order_type || ''}
                                                                                                         </p>
                                                                                                         <p className="text-xl text-gray-800 mt-2">
                                                                                                                <span className="font-TextFontSemiBold text-mainColor">Order Note:</span> {detailsData?.notes || "No Notes"}
                                                                                                         </p>
                                                                                                         {detailsData?.payment_method?.id !== 2 && (
                                                                                                                <p className="text-xl text-gray-800 mt-2">
                                                                                                                       <span className="font-TextFontSemiBold text-mainColor">Order Recipt:</span>
                                                                                                                       {detailsData?.receipt ? (
                                                                                                                              <>

                                                                                                                                     <span className='text-mainColor font-TextFontMedium ml-2 underline cursor-pointer'
                                                                                                                                            onClick={() => handleOpenReceipt(detailsData.id)}
                                                                                                                                     >
                                                                                                                                            Receipt
                                                                                                                                     </span>

                                                                                                                                     {openReceipt === detailsData.id && (
                                                                                                                                            <Dialog open={true} onClose={handleCloseReceipt} className="relative z-10">
                                                                                                                                                   <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                                                                                                   <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                                                                                          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                                                                                                 <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">

                                                                                                                                                                        {/* Permissions List */}
                                                                                                                                                                        {/* <div className="w-full flex flex-col items-start justify-center gap-4 my-4 px-4 sm:p-6 sm:pb-4">
                                                                                                                                                         sdf
                                                                                                                                                       </div> */}
                                                                                                                                                                        <div className="w-full flex justify-center items-center p-5  ">

                                                                                                                                                                               <img
                                                                                                                                                                                      src={detailsData?.receipt ? `data:image/jpeg;base64,${detailsData?.receipt}` : ''}
                                                                                                                                                                                      className=" max-h-[80vh] object-center object-contain shadow-md rounded-2xl"
                                                                                                                                                                                      alt="Receipt"
                                                                                                                                                                               />
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
                                                                                                                              </>
                                                                                                                       ) : (
                                                                                                                              <span className='text-mainColor font-TextFontMedium ml-2 underline'>No Recipt</span>
                                                                                                                       )}
                                                                                                                </p>
                                                                                                         )}
                                                                                                  </div>
                                                                                           </div>
                                                                                    </div>



                                                                                    {/* Items Table */}
                                                                                    {(detailsData?.order_details || []).map((item, index) => (
                                                                                           <div className='border-b-2 border-gray-500 mt-4' key={`${item.product_id}-${index}`} >
                                                                                                  <div className="text-center mb-2">
                                                                                                         <strong>Product Num({index + 1})</strong>
                                                                                                  </div>
                                                                                                  <table className="w-full sm:min-w-0 border-b-2">
                                                                                                         <thead>
                                                                                                                <tr className="bg-gray-100">
                                                                                                                       <th className="border p-2">QTY</th>
                                                                                                                       <th className="border p-2">DESC</th>
                                                                                                                       <th className="border p-2">Price</th>
                                                                                                                       <th className="border p-2">Count</th>
                                                                                                                </tr>
                                                                                                         </thead>
                                                                                                         <tbody>
                                                                                                                {item.product.map((itemProduct, indexProduct) => (
                                                                                                                       <tr key={`product - ${itemProduct.id} - ${indexProduct}`} className='border-b-2'>
                                                                                                                              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{indexProduct + 1}</td>
                                                                                                                              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{itemProduct.product.name}</td>
                                                                                                                              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{itemProduct.product.price}</td>
                                                                                                                              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{itemProduct.count}</td>
                                                                                                                       </tr>
                                                                                                                ))}
                                                                                                         </tbody>

                                                                                                  </table>

                                                                                                  <div className="text-center mb-2">
                                                                                                         <strong>Addons Num({index + 1})</strong>
                                                                                                  </div>
                                                                                                  <table className="w-full sm:min-w-0 border-b-2">
                                                                                                         <thead>
                                                                                                                <tr className="bg-gray-100">
                                                                                                                       <th className="border p-2">QTY</th>
                                                                                                                       <th className="border p-2">DESC</th>
                                                                                                                       <th className="border p-2">Price</th>
                                                                                                                       <th className="border p-2">Count</th>
                                                                                                                </tr>
                                                                                                         </thead>
                                                                                                         <tbody>
                                                                                                                {item.addons.map((itemAddons, indexAddons) => (
                                                                                                                       <tr key={`${itemAddons.addon.id}-${index}-${indexAddons}`} className='border-b-2'>
                                                                                                                              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{indexAddons + 1}</td>
                                                                                                                              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{itemAddons.addon.name}</td>
                                                                                                                              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{itemAddons.addon.price}</td>
                                                                                                                              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{itemAddons.count}</td>
                                                                                                                       </tr>
                                                                                                                ))}
                                                                                                         </tbody>

                                                                                                  </table>

                                                                                                  <div className="text-center mb-2">
                                                                                                         <strong>Excludes Num({index + 1})</strong>
                                                                                                  </div>
                                                                                                  <table className="w-full sm:min-w-0 border-b-2">
                                                                                                         <thead>
                                                                                                                <tr className="bg-gray-100">
                                                                                                                       <th className="border p-2">QTY</th>
                                                                                                                       <th className="border p-2">DESC</th>
                                                                                                                </tr>
                                                                                                         </thead>
                                                                                                         <tbody>
                                                                                                                {item.excludes.map((itemExclude, indexExclude) => (
                                                                                                                       <tr key={`${itemExclude.id}-${index}-${indexExclude}`} className='border-b-2'>
                                                                                                                              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{indexExclude + 1}</td>
                                                                                                                              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{itemExclude.name}</td>
                                                                                                                       </tr>
                                                                                                                ))}
                                                                                                         </tbody>

                                                                                                  </table>

                                                                                                  <div className="text-center mb-2">
                                                                                                         <strong>Extras Num({index + 1})</strong>
                                                                                                  </div>
                                                                                                  <table className="w-full sm:min-w-0 border-b-2">
                                                                                                         <thead>
                                                                                                                <tr className="bg-gray-100">
                                                                                                                       <th className="border p-2">QTY</th>
                                                                                                                       <th className="border p-2">DESC</th>
                                                                                                                       <th className="border p-2">Price</th>
                                                                                                                </tr>
                                                                                                         </thead>
                                                                                                         <tbody>
                                                                                                                {item.extras.map((itemExtra, indexExtra) => (
                                                                                                                       <tr key={`${itemExtra.id}-${index}-${indexExtra}`} className='border-b-2'>
                                                                                                                              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{indexExtra + 1}</td>
                                                                                                                              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{itemExtra.name}</td>
                                                                                                                              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{itemExtra.price}</td>
                                                                                                                       </tr>
                                                                                                                ))}
                                                                                                         </tbody>

                                                                                                  </table>

                                                                                                  <div className="text-center mb-2">
                                                                                                         <strong>Variations Num({index + 1})</strong>
                                                                                                  </div>
                                                                                                  {item.variations.map((item, indexItem) => (
                                                                                                         <div key={`${item.variation.id}-${index}-${indexItem}`} className='border-b-2'>

                                                                                                                <div className="text-center mb-2">
                                                                                                                       <strong>Variation({indexItem + 1})</strong>
                                                                                                                </div>
                                                                                                                <table className="w-full sm:min-w-0 border-b-2">
                                                                                                                       <thead>
                                                                                                                              <tr className="bg-gray-100" >
                                                                                                                                     {/* <th className="border p-2">QTY</th> */}
                                                                                                                                     <th className="border p-2">Name</th>
                                                                                                                                     <th className="border p-2">Type</th>
                                                                                                                                     <th className="border p-2">Max</th>
                                                                                                                                     <th className="border p-2">Min</th>
                                                                                                                                     {/* <th className="border p-2">Point</th> */}
                                                                                                                              </tr>
                                                                                                                       </thead>
                                                                                                                       <tbody>
                                                                                                                              <tr>
                                                                                                                                     {/* <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{indexItem + 1}</td> */}
                                                                                                                                     <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.variation.name || '-'}</td>
                                                                                                                                     <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.variation.type || '-'}</td>
                                                                                                                                     <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.variation.max || '0'}</td>
                                                                                                                                     <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.variation.min || '0'}</td>
                                                                                                                                     {/* <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.variation.point || '0'}</td> */}
                                                                                                                              </tr>
                                                                                                                       </tbody>
                                                                                                                </table>

                                                                                                                {item.options.map((option, indexOption) => (
                                                                                                                       <div key={`${option.id}-${index}-${indexItem}-${indexOption}`}>

                                                                                                                              <div className="text-center mb-2">
                                                                                                                                     <strong>Option({indexOption + 1})</strong>
                                                                                                                              </div>

                                                                                                                              <table className="w-full sm:min-w-0 border-b-2 mb-2">
                                                                                                                                     <thead>
                                                                                                                                            <tr className="bg-gray-100">
                                                                                                                                                   <th className="border p-2">QTY</th>
                                                                                                                                                   <th className="border p-2">Name</th>
                                                                                                                                                   <th className="border p-2">Price</th>
                                                                                                                                                   <th className="border p-2">Points</th>
                                                                                                                                            </tr>
                                                                                                                                     </thead>
                                                                                                                                     <tbody>
                                                                                                                                            <tr>
                                                                                                                                                   <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{indexOption + 1}</td>
                                                                                                                                                   <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{option.name || '-'}</td>
                                                                                                                                                   <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{option.price || '0'}</td>
                                                                                                                                                   <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{option.Points || '0'}</td>
                                                                                                                                            </tr>
                                                                                                                                     </tbody>
                                                                                                                              </table>
                                                                                                                       </div>
                                                                                                                ))}
                                                                                                         </div>
                                                                                                  ))}
                                                                                           </div>
                                                                                    ))}

                                                                                    {/* Order Summary */}
                                                                                    <div className="my-4 flex flex-col gap-y-1">
                                                                                           <p className='w-full flex items-center justify-between'>
                                                                                                  {(detailsData?.order_details || []).forEach((orderDetail) => {
                                                                                                         // Sum extras prices
                                                                                                         orderDetail.extras.forEach((extraItem) => {
                                                                                                                totalItemPrice += extraItem.price;
                                                                                                         });

                                                                                                         // Sum product prices (price * count)
                                                                                                         orderDetail.product.forEach((productItem) => {
                                                                                                                totalItemPrice += productItem.product.price * productItem.count;
                                                                                                         });

                                                                                                         // Sum variations' options prices
                                                                                                         orderDetail.variations.forEach((variation) => {
                                                                                                                variation.options.forEach((optionItem) => {
                                                                                                                       totalItemPrice += optionItem.price;
                                                                                                                });
                                                                                                         });
                                                                                                  })}

                                                                                                  {/* Display total items price */}
                                                                                                  Items Price:<span>
                                                                                                         {totalItemPrice}
                                                                                                  </span>
                                                                                           </p>

                                                                                           <p className='w-full flex items-center justify-between'>
                                                                                                  Tax / VAT:<span>

                                                                                                         {detailsData?.total_tax || 0}
                                                                                                  </span>
                                                                                           </p>
                                                                                           <p className="w-full flex items-center justify-between">
                                                                                                  {(detailsData?.order_details || []).forEach((orderDetail) => {
                                                                                                         orderDetail.addons.forEach((addonItem) => {
                                                                                                                // Add the price of each addon to the total
                                                                                                                totalAddonPrice += addonItem.addon.price * addonItem.count;
                                                                                                         });
                                                                                                  })}

                                                                                                  <span>Addons Price:</span>
                                                                                                  <span>{totalAddonPrice}</span>
                                                                                           </p>
                                                                                           <p className='w-full flex items-center justify-between'>
                                                                                                  Subtotal:<span>{detailsData?.amount + detailsData?.total_tax + totalAddonPrice}</span>
                                                                                           </p>
                                                                                           <p className='w-full flex items-center justify-between'>
                                                                                                  Extra Discount: <span>{detailsData?.total_discount || 0}</span>
                                                                                           </p>
                                                                                           <p className='w-full flex items-center justify-between'>
                                                                                                  Coupon Discount:<span>  {detailsData?.coupon_discount || 0}</span>
                                                                                           </p>
                                                                                           <p className='w-full flex items-center justify-between'>
                                                                                                  Delivery Fee:<span>  {detailsData?.address?.zone?.price || 0}</span>
                                                                                           </p>
                                                                                           <p className="w-full flex items-center justify-between font-TextFontSemiBold text-lg">
                                                                                                  Total:<span>
                                                                                                         {detailsData?.amount}
                                                                                                  </span>
                                                                                           </p>
                                                                                    </div>
                                                                             </div>
                                                                      )}
                                                               </div>
                                                        </div>

                                                        {/* Right Section */}
                                                        <div className="sm:w-full lg:w-4/12">
                                                               {/* Order Setup */}
                                                               <div className="w-full bg-white rounded-xl shadow-md p-4 m">

                                                                      <div className="flex flex-col gap-y-2">
                                                                             <span className="font-TextFontSemiBold">Change Order Status</span>

                                                                             <DropDown
                                                                                    ref={StatusRef}
                                                                                    handleOpen={handleOpenOrderStatus}
                                                                                    stateoption={orderStatusName}
                                                                                    openMenu={isOpenOrderStatus}
                                                                                    handleOpenOption={handleOpenOptionOrderStatus}
                                                                                    onSelectOption={(selectedOption) => handleSelectOrderStatus(selectedOption)} // Pass selected option
                                                                                    options={orderStatus}
                                                                             />

                                                                             {openOrderNumber === detailsData?.id && (
                                                                                    <Dialog open={true} onClose={handleCloseOrderNumber} className="relative z-10">
                                                                                           <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                                           <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                                         <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">

                                                                                                                {/* Permissions List */}
                                                                                                                <div className="w-full flex flex-col items-start justify-center gap-4 my-4 px-4 sm:p-6 sm:pb-4">
                                                                                                                       <span>Order Number:</span>
                                                                                                                       {/* <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center"> */}
                                                                                                                       <TextInput
                                                                                                                              value={orderNumber} // Access category_name property
                                                                                                                              onChange={(e) => setOrderNumber(e.target.value)}
                                                                                                                              placeholder="Order Number"
                                                                                                                       />
                                                                                                                       {/* </div> */}
                                                                                                                </div>

                                                                                                                {/* Dialog Footer */}
                                                                                                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-x-3">
                                                                                                                       <button
                                                                                                                              type="button"
                                                                                                                              onClick={handleCloseOrderNumber}
                                                                                                                              className="inline-flex w-full justify-center rounded-md bg-white border-2 px-6 py-3 text-sm font-TextFontMedium text-mainColor sm:mt-0 sm:w-auto"
                                                                                                                       >
                                                                                                                              Close
                                                                                                                       </button>
                                                                                                                       <button
                                                                                                                              type="button"
                                                                                                                              onClick={() => handleOrderNumber(detailsData.id)}
                                                                                                                              className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-TextFontMedium text-white sm:mt-0 sm:w-auto"
                                                                                                                       >
                                                                                                                              Change Status
                                                                                                                       </button>
                                                                                                                </div>

                                                                                                         </DialogPanel>
                                                                                                  </div>
                                                                                           </div>
                                                                                    </Dialog>
                                                                             )}

                                                                      </div>
                                                                      <div className="mt-4">
                                                                             <label className="text-sm">Delivery Date & Time</label>
                                                                             <div className="flex gap-2 mt-2">
                                                                                    <input type="date" className="w-1/2 p-2 border rounded-md" value={detailsData.order_date} readOnly />
                                                                                    <input type="time" className="w-1/2 p-2 border rounded-md" value={detailsData.date} readOnly />
                                                                             </div>
                                                                      </div>
                                                                      {detailsData.order_type === 'delivery' && (detailsData.order_status === 'processing' || detailsData.order_status === 'out_for_delivery') && (
                                                                             <button className="w-full bg-mainColor text-white py-2 rounded-md mt-4"
                                                                                    onClick={() => handleOpenDeliviers(detailsData.id)}>
                                                                                    Assign Delivery Man
                                                                             </button>
                                                                      )}

                                                                      {openDeliveries === detailsData.id && (
                                                                             <Dialog open={true} onClose={handleCloseDeliveries} className="relative z-10">
                                                                                    <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                           <div className="flex min-h-full items-end justify-center  text-center sm:items-center sm:p-0">
                                                                                                  <DialogPanel className="relative sm:w-full sm:max-w-2xl  pt-4 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
                                                                                                         <div className="mb-2 px-2">

                                                                                                                <SearchBar
                                                                                                                       placeholder="Search Delivery"
                                                                                                                       value={searchDelivery}
                                                                                                                       handleChange={handleChangeDeliveries}
                                                                                                                />
                                                                                                         </div>
                                                                                                         <div className="px-4 flex flex-col gap-3 max-h-64 overflow-x-scroll scrollPage">
                                                                                                                {deliveriesFilter.length === 0 ? (
                                                                                                                       <div className="text-center font-TextFontMedium text-mainColor">
                                                                                                                              Not Found Delivery
                                                                                                                       </div>
                                                                                                                ) : (
                                                                                                                       deliveriesFilter.map((delivery) => (
                                                                                                                              <div
                                                                                                                                     className="border-2 flex items-center justify-between border-gray-400 p-2 rounded-2xl"
                                                                                                                                     key={`${delivery.id}-${detailsData.id}`}
                                                                                                                              >
                                                                                                                                     <span className="font-TextFontRegular text-xl">
                                                                                                                                            {delivery?.f_name || '-'} {delivery?.l_name || '-'}
                                                                                                                                     </span>
                                                                                                                                     <button
                                                                                                                                            type="button"
                                                                                                                                            onClick={() => handleAssignDelivery(delivery.id, detailsData.id, detailsData.order_number)}
                                                                                                                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-TextFontMedium text-white shadow-sm sm:mt-0 sm:w-auto hover:bg-mainColor-dark focus:outline-none"
                                                                                                                                     >
                                                                                                                                            Assign
                                                                                                                                     </button>
                                                                                                                              </div>
                                                                                                                       ))
                                                                                                                )}
                                                                                                         </div>

                                                                                                         {/* Dialog Footer */}
                                                                                                         <div className="px-4 py-3 sm:flex sm:flex-row-reverse">
                                                                                                                <button
                                                                                                                       type="button"
                                                                                                                       onClick={handleCloseDeliveries}
                                                                                                                       className="mt-3 inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-TextFontMedium text-white shadow-sm sm:mt-0 sm:w-auto hover:bg-mainColor-dark focus:outline-none"
                                                                                                                >
                                                                                                                       Close
                                                                                                                </button>
                                                                                                         </div>

                                                                                                  </DialogPanel>
                                                                                           </div>
                                                                                    </div>
                                                                             </Dialog>
                                                                      )}
                                                               </div>
                                                               {/* Food Preparation Time */}
                                                               {(detailsData.order_status === 'pending' ||
                                                                      detailsData.order_status === 'confirmed' ||
                                                                      detailsData.order_status === 'processing' ||
                                                                      detailsData.order_status === 'out_for_delivery') && (
                                                                             <div className="w-full bg-white rounded-xl shadow-md p-4 mt-4">
                                                                                    <h3 className="text-lg font-TextFontSemiBold">Food Preparation Time</h3>
                                                                                    <div className="flex items-center">
                                                                                           <FaClock className="mr-2 text-gray-500" />
                                                                                           {preparationTime ? (
                                                                                                  <>
                                                                                                         <span
                                                                                                                className={
                                                                                                                       (olderHours + preparationTime.hours) - initialTime.currentHour <= 0 ||
                                                                                                                              (olderDay + preparationTime.days) - initialTime.currentDay <= 0
                                                                                                                              ? "text-red-500"
                                                                                                                              : "text-cyan-400"
                                                                                                                }
                                                                                                         >
                                                                                                                {(olderHours + preparationTime.hours) - initialTime.currentHour <= 0 ? (
                                                                                                                       <>
                                                                                                                              {(olderDay + preparationTime.days) - initialTime.currentDay}d{" "}
                                                                                                                              {initialTime.currentHour - (olderHours + preparationTime.hours)}h{" "}
                                                                                                                              {(olderMinutes + preparationTime.minutes) - initialTime.currentMinute}m{" "}
                                                                                                                              {preparationTime.seconds}s Over
                                                                                                                       </>
                                                                                                                ) : (
                                                                                                                       <>
                                                                                                                              {initialTime.currentDay - olderDay}d {preparationTime.hours}h{" "}
                                                                                                                              {(olderMinutes + preparationTime.minutes) - initialTime.currentMinute}m{" "}
                                                                                                                              {preparationTime.seconds}s Left
                                                                                                                       </>
                                                                                                                )}
                                                                                                         </span>
                                                                                                  </>
                                                                                           ) : (
                                                                                                  <span className="text-gray-400">Preparing time not available</span>
                                                                                           )}
                                                                                    </div>
                                                                                    {/* <span>preparationTime.hours: {preparationTime?.hours}</span>
                                                                                    <br />
                                                                                    <span>olderHours: {olderHours}</span>
                                                                                    <br />
                                                                                    <span>currentHour: {initialTime?.currentHour}</span>
                                                                                    <br />
                                                                                    <span>preparationTime.minutes: {preparationTime?.minutes}</span>
                                                                                    <br />
                                                                                    <span>olderMinutes: {olderMinutes}</span>
                                                                                    <br />
                                                                                    <span>currentMinute: {initialTime?.currentMinute}</span> */}
                                                                             </div>
                                                                      )
                                                               }


                                                               {detailsData.delivery_id !== null && (

                                                                      <div className="w-full bg-white rounded-xl shadow-md p-4 mt-4">
                                                                             <div className="flex items-center gap-x-2 text-lg font-TextFontSemiBold"><span><FaUser className='text-mainColor' /></span>Delivery Man</div>
                                                                             <p className="text-sm">Name: {detailsData?.delivery?.f_name || '-'} {detailsData?.delivery?.l_name || '-'}</p>
                                                                             <p className="text-sm">Orders: {detailsData?.delivery?.count_orders || '-'}</p>
                                                                             <p className="text-sm">Contact: {detailsData?.delivery?.phone || '-'}</p>
                                                                             <p className="text-sm">Email: {detailsData?.delivery?.email || '-'}</p>
                                                                      </div>
                                                               )}



                                                               {/* Delivery Information */}
                                                               {detailsData.order_type === 'delivery' && (
                                                                      <div className="w-full bg-white rounded-xl shadow-md p-4 mt-4">
                                                                             <div className="flex items-center gap-x-2 text-lg font-TextFontSemiBold"><span><FaUser className='text-mainColor' /></span>Delivery Information</div>
                                                                             <p className="text-sm">Name: {detailsData?.user?.f_name || '-'} {detailsData?.user?.l_name || '-'}</p>
                                                                             <p className="text-sm">Contact: {detailsData?.user?.phone || '-'}</p>
                                                                             <p className="text-sm">Build Num: {detailsData?.address?.building_num || '-'}</p>
                                                                             <p className="text-sm">Floor: {detailsData?.address?.floor_num || '-'}</p>
                                                                             <p className="text-sm">House: {detailsData?.address?.apartment || '-'}</p>
                                                                             <p className="text-sm">Road: {detailsData?.address?.street || '-'}</p>
                                                                             <p className="text-sm pb-2 text-center">
                                                                                    {detailsData?.address?.address || '-'}
                                                                             </p>
                                                                             {detailsData?.address?.additional_data || '' && (
                                                                                    <p className="text-sm border-t-2 text-center pt-2">
                                                                                           {detailsData?.address?.additional_data || '-'}
                                                                                    </p>
                                                                             )}
                                                                             {detailsData?.address?.map && (
                                                                                    <p className="text-sm line-clamp-3">
                                                                                           Location Map:
                                                                                           <a
                                                                                                  href={detailsData?.address?.map}
                                                                                                  className='ml-1 text-mainColor font-TextFontMedium underline'
                                                                                                  target="_blank"
                                                                                                  rel="noopener noreferrer"
                                                                                           >
                                                                                                  {detailsData?.address?.map?.length > 30 ? `${detailsData?.address?.map?.slice(0, 30)}...` : detailsData?.address?.map}
                                                                                           </a>
                                                                                    </p>
                                                                             )}

                                                                      </div>
                                                               )}

                                                               <div className="w-full bg-white rounded-xl shadow-md p-4 mt-4">
                                                                      <div className="flex items-center gap-x-2 text-lg font-TextFontSemiBold"><span><FaUser className='text-mainColor' /></span>Customer Information</div>
                                                                      <p className="text-sm">Name: {detailsData?.user?.f_name || '-'} {detailsData?.user?.l_name || '-'}</p>
                                                                      <p className="text-sm">Orders: {detailsData?.user?.count_orders || '-'}</p>
                                                                      <p className="text-sm">Contact: {detailsData?.user?.phone || '-'}</p>
                                                                      <p className="text-sm">Email: {detailsData?.user?.email || '-'}</p>
                                                               </div>

                                                               {/* Branch Information */}
                                                               <div className="w-full bg-white rounded-xl shadow-md p-4 mt-4">
                                                                      <h3 className="text-lg font-TextFontSemiBold">Branch Information</h3>
                                                                      <p className="text-sm">Branch: {detailsData?.branch?.address || '-'}</p>
                                                                      <p className="text-sm">Orders Served: {detailsData?.branch?.count_orders || '-'}</p>
                                                                      <p className="text-sm">Contact: {detailsData?.branch?.phone || '-'}</p>
                                                                      <p className="text-sm">Email: {detailsData?.branch?.email || '-'}</p>
                                                                      {/* <p className="text-sm">Location: Miami 45</p> */}
                                                               </div>
                                                        </div>
                                                 </div>
                                          )
                                   }
                            </>
                     )}
              </>

       )
}

export default DetailsOrderPage