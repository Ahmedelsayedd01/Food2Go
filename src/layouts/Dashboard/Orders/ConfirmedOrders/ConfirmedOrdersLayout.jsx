import React, { useEffect } from 'react'
import { LoaderLogin, TitlePage } from '../../../../Components/Components'
import { ConfirmedOrdersPage, SelectDateRangeSection } from '../../../../Pages/Pages'
import { useGet } from '../../../../Hooks/useGet';
import { OrdersComponent } from '../../../../Store/CreateSlices';

const ConfirmedOrdersLayout = () => {

       const { refetch: refetchBranch, loading: loadingBranch, data: dataBranch } = useGet({ url: 'https://bcknd.food2go.online/admin/order/branches' });

       useEffect(() => {
              refetchBranch(); // Refetch data when the component mounts
       }, [refetchBranch]);

       return (
              <>
                     <OrdersComponent />
                     <div className="w-full flex flex-col mb-0">
                            <TitlePage text={'Confirmed Orders'} />
                            {loadingBranch ? (
                                   <>
                                          <div className="w-full flex justify-center items-center">
                                                 <LoaderLogin />
                                          </div>
                                   </>
                            ) : (
                                   <>
                                          <SelectDateRangeSection typPage={'confirmed'} branchsData={dataBranch} />

                                          <ConfirmedOrdersPage />
                                   </>
                            )}
                     </div>
              </>
       )
}

export default ConfirmedOrdersLayout