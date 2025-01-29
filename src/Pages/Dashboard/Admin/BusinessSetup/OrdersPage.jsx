import { useEffect, useState } from "react";
import { LoaderLogin, NumberInput, StaticButton, SubmitButton, TitleSection } from "../../../../Components/Components";
import { useGet } from "../../../../Hooks/useGet";
import { usePost } from "../../../../Hooks/usePostJson";

const OrdersPage = () => {

       const [minOrderValue, setMinOrderValue] = useState('');

       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const {
              refetch: refetchOrder,
              loading: loadingOrder,
              data: dataOrder,
       } = useGet({
              url: `${apiUrl}/admin/settings/business_setup/order_setting`,
       });
       const [Order, setOrder] = useState([]);

       const { postData, loadingPost, response } = usePost({
              url: `${apiUrl}/admin/settings/business_setup/order_setting/add `,
       });
       useEffect(() => {
              refetchOrder()
       }, [refetchOrder])

       useEffect(() => {
              if (dataOrder) {
                     setOrder(dataOrder)
                     const setting = JSON.parse(dataOrder.order_setting.setting);
                     setMinOrderValue(setting.min_order)
              }
              console.log("data order", dataOrder)
       }, [dataOrder])

       const handleReset = () => {
              setMinOrderValue('');
       }

       const handleSubmit = (e) => {
              e.preventDefault();

              const formData = new FormData();
              formData.append("min_price", minOrderValue)
              postData(formData, "order Added Successfully");
              console.log("all data submit ", formData)

       }

       return (
              <>
                     {loadingOrder || loadingPost ? (
                            <>
                                   <div className="w-full h-56 flex justify-center items-center">
                                          <LoaderLogin />
                                   </div>
                            </>
                     ) : <form
                            className="w-full flex sm:flex-col lg:flex-row flex-wrap items-start justify-start gap-4"
                            onSubmit={handleSubmit}
                     >
                            <TitleSection text={'Order Settings'} />

                            {/* Min Order Value */}
                            <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                   <span className="text-xl font-TextFontRegular text-thirdColor">Min Order value (E£):</span>
                                   <NumberInput
                                          value={minOrderValue}
                                          onChange={(e) => setMinOrderValue(e.target.value)}
                                          placeholder="Min Order Value"
                                   />
                            </div>
                            {/* Buttons */}
                            <div className="w-full flex items-center justify-end gap-x-4 ">
                                   <div className="">
                                          <StaticButton text={'Reset'} handleClick={handleReset} bgColor='bg-transparent' Color='text-mainColor' border={'border-2'} borderColor={'border-mainColor'} rounded='rounded-full' />
                                   </div>
                                   <div className="">
                                          <SubmitButton
                                                 text={'Submit'}
                                                 rounded='rounded-full'
                                                 handleClick={handleSubmit}
                                          />
                                   </div>

                            </div>
                     </form>
                     }
              </>
       )
}

export default OrdersPage