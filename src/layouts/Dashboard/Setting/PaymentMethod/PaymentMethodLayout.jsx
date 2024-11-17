import React from 'react'
import { AddPaymentMethodSection, PaymentMethodPage } from '../../../../Pages/Pages'
import { TitlePage, TitleSection } from '../../../../Components/Components'

const PaymentMethodLayout = () => {
       return (
              <>
                     <TitlePage text={'Add New Payment Method'} />
                     <AddPaymentMethodSection />
                     <TitleSection text={'Payment Methods Table'} />
                     <PaymentMethodPage />
              </>
       )
}

export default PaymentMethodLayout