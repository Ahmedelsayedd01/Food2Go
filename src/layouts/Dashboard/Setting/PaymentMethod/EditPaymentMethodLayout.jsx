import React from 'react'
import { TitlePage } from '../../../../Components/Components'
import { EditPaymentMethodPage } from '../../../../Pages/Pages'

const EditPaymentMethodLayout = () => {
       return (
              <>
                     <TitlePage text={'Edit Payment Method'} />
                     <EditPaymentMethodPage />
              </>
       )
}

export default EditPaymentMethodLayout