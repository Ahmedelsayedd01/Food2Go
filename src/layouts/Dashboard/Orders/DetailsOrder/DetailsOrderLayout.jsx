import React from 'react'
import { TitlePage } from '../../../../Components/Components'
import { DetailsOrdersPage } from '../../../../Pages/Pages'

const DetailsOrderLayout = () => {
       return (
              <>
                     <TitlePage text={'Details Orders'} />
                     {/* <AddPaymentMethodSection /> */}
                     {/* <TitleSection text={'Payment Methods Table'} /> */}
                     <DetailsOrdersPage />
              </>
       )
}

export default DetailsOrderLayout