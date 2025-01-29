import React, { useEffect, useState } from 'react'
import { useGet } from '../../../../../Hooks/useGet';
import { usePost } from '../../../../../Hooks/usePostJson';
import { LoaderLogin, SubmitButton, TextInput } from '../../../../../Components/Components';

const DeliveryTimePage = () => {
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { refetch: refetchDeliveryTime, loading: loadingDeliveryTime, data: dataDeliveryTime } = useGet({
              url: `${apiUrl}/admin/settings/delivery_time`
       });
       const { postData, loadingPost, response } = usePost({ url: `${apiUrl}/admin/settings/delivery_time_update` });

       const [deliveryTime, setDeliveryTime] = useState('');


       useEffect(() => {
              refetchDeliveryTime();
       }, [refetchDeliveryTime]);

       useEffect(() => {
              if (dataDeliveryTime && dataDeliveryTime.delivery_time) {
                     setDeliveryTime(dataDeliveryTime.delivery_time.setting || '');
              }
       }, [dataDeliveryTime]); // Only run this effect when `data` changes


       const handleChangeDeliveryTime = (e) => {
              e.preventDefault();

              if (!deliveryTime) {
                     auth.toastError('please Enter Delivery Time')
                     return;
              }

              const formData = new FormData();

              formData.append("delivery_time", deliveryTime);


              console.log(...formData.entries());
              postData(formData, "Delivery Time Changed Success")
       };
       return (
              <>
                     {loadingPost || loadingDeliveryTime ? (
                            <>
                                   <div className="w-full flex justify-center items-center">
                                          <LoaderLogin />
                                   </div>
                            </>
                     ) : (
                            <section>
                                   <form onSubmit={handleChangeDeliveryTime}>

                                          <div className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4 mb-4">
                                                 {/* Tax Types */}
                                                 <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                        <span className="text-xl font-TextFontRegular text-thirdColor">Time:</span>
                                                        <TextInput
                                                               value={deliveryTime}
                                                               onChange={(e) => setDeliveryTime(e.target.value)}
                                                               placeholder={'Delivery Time'}
                                                        />
                                                 </div>
                                          </div>

                                          {/* Buttons*/}
                                          <div className="w-full flex items-center justify-end gap-x-4">
                                                 <div className="">
                                                        <SubmitButton
                                                               text={'Change'}
                                                               rounded='rounded-full'
                                                               handleClick={handleChangeDeliveryTime}
                                                        />
                                                 </div>

                                          </div>
                                   </form>
                            </section>
                     )}
              </>
       )
}

export default DeliveryTimePage