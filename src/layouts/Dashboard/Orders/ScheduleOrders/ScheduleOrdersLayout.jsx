import React, { useEffect } from 'react'
import { LoaderLogin, TitlePage } from '../../../../Components/Components'
import { ScheduleOrdersPage, SelectDateRangeSection } from '../../../../Pages/Pages'
import { OrdersComponent } from '../../../../Store/CreateSlices'
import { useGet } from '../../../../Hooks/useGet'

const ScheduleOrdersLayout = () => {
       const { refetch: refetchBranch, loading: loadingBranch, data: dataBranch } = useGet({ url: 'https://bcknd.food2go.online/admin/order/branches' });

       useEffect(() => {
              refetchBranch(); // Refetch data when the component mounts
       }, [refetchBranch]);
       return (
              <>
                     <OrdersComponent />
                     <div className="w-full flex flex-col mb-0">
                            <TitlePage text={'Schedule Orders'} />
                            {loadingBranch ? (
                                   <>
                                          <div className="w-full flex justify-center items-center">
                                                 <LoaderLogin />
                                          </div>
                                   </>
                            ) : (
                                   <>
                                          <SelectDateRangeSection typPage={'scheduled'} branchsData={dataBranch} />

                                          <ScheduleOrdersPage />
                                   </>
                            )}
                     </div>
              </>
       )
}

export default ScheduleOrdersLayout