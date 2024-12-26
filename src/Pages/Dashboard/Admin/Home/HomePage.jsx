import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CartsOrderSection from '../Orders/AllOrders/CartsOrderSection'
import { LoaderLogin } from '../../../../Components/Components'
import { OrdersComponent } from '../../../../Store/CreateSlices'
import { useGet } from '../../../../Hooks/useGet'

const HomePage = () => {
       const { refetch: refetchCountOrders, loading, data: dataCountOrders } = useGet({
              url: "https://Bcknd.food2go.online/admin/order/count",
       });

       useEffect(() => {
              console.log("Fetching Count Orders...");
              refetchCountOrders();
       }, [refetchCountOrders]);

       const userName = useSelector(state => state.user.name)

       const counters = {
              ordersAll: dataCountOrders?.orders || 0,
              ordersPending: dataCountOrders?.pending || 0,
              ordersConfirmed: dataCountOrders?.confirmed || 0,
              ordersProcessing: dataCountOrders?.processing || 0,
              ordersOutForDelivery: dataCountOrders?.out_for_delivery || 0,
              ordersDelivered: dataCountOrders?.delivered || 0,
              ordersReturned: dataCountOrders?.returned || 0,
              ordersFailed: dataCountOrders?.faild_to_deliver || 0,
              ordersCanceled: dataCountOrders?.canceled || 0,
              ordersSchedule: dataCountOrders?.scheduled || 0,
       }

       return (
              <>
                     <OrdersComponent />
                     <div className="w-full flex flex-col mb-0">
                            {loading ? (
                                   <>
                                          <div className="w-full flex justify-center items-center">
                                                 <LoaderLogin />
                                          </div>
                                   </>
                            ) : (
                                   <>
                                          <CartsOrderSection ordersNum={counters} />
                                   </>
                            )}
                     </div>
              </>
       )
}

export default HomePage