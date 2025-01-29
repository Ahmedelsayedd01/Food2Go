import React, { useEffect, useRef, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import { usePost } from '../../../../../Hooks/usePostJson';
import { LoaderLogin, Switch } from '../../../../../Components/Components';
import { useChangeState } from '../../../../../Hooks/useChangeState';

const OrderTypePage = () => {
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { refetch: refetchOrderType, loading: loadingOrderType, data: dataOrderType } = useGet({
              url: `${apiUrl}/admin/settings/order_type`,
       });

       const { changeState, loadingChange, responseChange } = useChangeState();

       const [orderTypes, setOrderTypes] = useState([])

       // Fetch data from the API
       useEffect(() => {
              refetchOrderType();
       }, [refetchOrderType]);

       // Update song source when API data is received
       useEffect(() => {
              if (dataOrderType && dataOrderType.order_types) {
                     setOrderTypes(dataOrderType.order_types);
                     console.log('Fetched Order type from API:', dataOrderType.order_types);
              }
       }, [dataOrderType]);


       const handleChangeStatus = async (id, name, status) => {
              const response = await changeState(
                     `${apiUrl}/admin/settings/order_type/update`,
                     `${name} Changed Status.`,
                     { id, status } // Pass status as an object if changeState expects an object
              );

              if (response) {
                     // Update categories only if changeState succeeded
                     setOrderTypes((prevOrderTypes) =>
                            prevOrderTypes.map((orderType) =>
                                   orderType.id === id ? { ...orderType, status: status } : orderType
                            )
                     );
              }

       };

       const types = ['Take Away', 'Dine In', 'Delivery'];

       return (
              <>
                     {loadingChange || loadingOrderType ? (
                            <div className="w-full flex justify-center items-center">
                                   <LoaderLogin />
                            </div>
                     ) : (
                            <section className="w-full flex flex-wrap items-center justify-between gap-y-2">
                                   {orderTypes.map((type, index) => (
                                          <div key={type.id} className="sm:w-full lg:w-[30%] flex items-center justify-start gap-x-1">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">
                                                        {types[index] || '-'}:
                                                 </span>
                                                 <Switch
                                                        checked={type.status === 1}
                                                        handleClick={() => {
                                                               handleChangeStatus(type.id, types[index], type.status === 1 ? 0 : 1);
                                                        }}
                                                 />
                                          </div>
                                   ))}
                            </section>
                     )}
              </>
       );

};

export default OrderTypePage;