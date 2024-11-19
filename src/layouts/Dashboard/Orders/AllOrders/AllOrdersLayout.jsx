import React from 'react'
import { TitlePage } from '../../../../Components/Components'
import { AllOrdersPage } from '../../../../Pages/Pages'

const AllOrdersLayout = () => {
       return (
              <>
                     <TitlePage text={'All Orders'} />
                     {/* <AddPaymentMethodSection /> */}
                     {/* <TitleSection text={'Payment Methods Table'} /> */}
                     <AllOrdersPage />
              </>
       )
}

export default AllOrdersLayout