import React, { useEffect } from 'react'
import { LoaderLogin, TitlePage } from '../../../../Components/Components'
import { FailedOrdersPage, SelectDateRangeSection } from '../../../../Pages/Pages'
import { OrdersComponent } from '../../../../Store/CreateSlices'
import { useGet } from '../../../../Hooks/useGet'

const FailedOrdersLayout = () => {
       const { refetch: refetchBranch, loading: loadingBranch, data: dataBranch } = useGet({ url: 'https://bcknd.food2go.online/admin/order/branches' });

       useEffect(() => {
              refetchBranch(); // Refetch data when the component mounts
       }, [refetchBranch]);
       return (
              <>
                     <OrdersComponent />
                     <div className="w-full flex flex-col mb-0">
                            <TitlePage text={'Failed Orders'} />
                            {loadingBranch ? (
                                   <>
                                          <div className="w-full flex justify-center items-center">
                                                 <LoaderLogin />
                                          </div>
                                   </>
                            ) : (
                                   <>
                                          <SelectDateRangeSection typPage={'faild_to_deliver'} branchsData={dataBranch} />

                                          <FailedOrdersPage />
                                   </>
                            )}
                     </div>
              </>
       )
}

export default FailedOrdersLayout