import React from 'react'
import { TitlePage } from '../../../../Components/Components'
import { InvoiceOrdersPage } from '../../../../Pages/Pages'

const InvoiceOrderLayout = () => {
       return (
              <>
                     <TitlePage text={'Order Invoice'} />
                     {/* <AddPaymentMethodSection /> */}
                     {/* <TitleSection text={'Payment Methods Table'} /> */}
                     <InvoiceOrdersPage />
              </>
       )
}

export default InvoiceOrderLayout