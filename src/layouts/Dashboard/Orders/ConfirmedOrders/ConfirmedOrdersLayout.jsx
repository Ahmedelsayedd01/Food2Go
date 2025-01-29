import React, { useEffect } from 'react'
import { LoaderLogin, TitlePage } from '../../../../Components/Components'
import { ConfirmedOrdersPage, SelectDateRangeSection } from '../../../../Pages/Pages'
import { useGet } from '../../../../Hooks/useGet';
import { OrdersComponent } from '../../../../Store/CreateSlices';

const ConfirmedOrdersLayout = () => {

       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { refetch: refetchBranch, loading: loadingBranch, data: dataBranch } = useGet({
              url: `${apiUrl}/admin/order/branches`
       });

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