import React, { useEffect } from 'react'
import { LoaderLogin, TitlePage } from '../../../../Components/Components'
import { AllOrdersPage, CartsOrderSection, SelectDateRangeSection } from '../../../../Pages/Pages'
import { useGet } from '../../../../Hooks/useGet';
import { useSelector } from 'react-redux';
import { OrdersComponent } from '../../../../Store/CreateSlices';

const AllOrdersLayout = () => {
       const ordersAllCount = useSelector(state => state.ordersAll.data);
       const ordersAllCountLoading = useSelector(state => state.ordersAll.loading);
       const ordersPendingCount = useSelector(state => state.ordersPending.data);
       const ordersConfirmedCount = useSelector(state => state.ordersConfirmed.data);
       const ordersProcessingCount = useSelector(state => state.ordersProcessing.data);
       const ordersOutForDeliveryCount = useSelector(state => state.ordersOutForDelivery.data);
       const ordersDeliveredCount = useSelector(state => state.ordersDelivered.data);
       const ordersReturnedCount = useSelector(state => state.ordersReturned.data);
       const ordersFailedCount = useSelector(state => state.ordersFailed.data);
       const ordersCanceledCount = useSelector(state => state.ordersCanceled.data);
       const ordersScheduleCount = useSelector(state => state.ordersSchedule.data);

       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { refetch: refetchBranch, loading: loadingBranch, data: dataBranch } = useGet({
              url: `${apiUrl}/admin/order/branches`
       });

       console.log('orderAllCount', ordersAllCount)
       useEffect(() => {
              refetchBranch(); // Refetch data when the component mounts
       }, [refetchBranch]);

       const counters = {
              ordersAll: ordersAllCount.length,
              ordersPending: ordersPendingCount.length,
              ordersConfirmed: ordersConfirmedCount.length,
              ordersProcessing: ordersProcessingCount.length,
              ordersOutForDelivery: ordersOutForDeliveryCount.length,
              ordersDelivered: ordersDeliveredCount.length,
              ordersReturned: ordersReturnedCount.length,
              ordersFailed: ordersFailedCount.length,
              ordersCanceled: ordersCanceledCount.length,
              ordersSchedule: ordersScheduleCount.length,
       }

       return (
              <>
                     <OrdersComponent />
                     <div className="w-full flex flex-col mb-0">
                            <TitlePage text={'All Orders'} />
                            {loadingBranch || ordersAllCountLoading ? (
                                   <>
                                          <div className="w-full flex justify-center items-center">
                                                 <LoaderLogin />
                                          </div>
                                   </>
                            ) : (
                                   <>
                                          <SelectDateRangeSection typPage={'all'} branchsData={dataBranch} />

                                          <CartsOrderSection ordersNum={counters} />
                                          <AllOrdersPage />
                                   </>
                            )}
                     </div>
              </>
       )
}

export default AllOrdersLayout