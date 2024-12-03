import React, { useState } from 'react'
import { AddPaymentMethodSection, PaymentMethodPage } from '../../../../Pages/Pages'
import { TitlePage, TitleSection } from '../../../../Components/Components'

const PaymentMethodLayout = () => {
       const [update, setUpdate] = useState(false)
       return (
              <>
                     <TitlePage text={'Add New Payment Method'} />
                     <AddPaymentMethodSection update={update} setUpdate={setUpdate}/>
                     <TitleSection text={'Payment Methods Table'} />
                     <PaymentMethodPage refetch={update}/>
              </>
       )
}

export default PaymentMethodLayout