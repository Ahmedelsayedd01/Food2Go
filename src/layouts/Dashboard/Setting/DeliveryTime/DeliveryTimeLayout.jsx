import React from 'react'
import { TitlePage } from '../../../../Components/Components'
import { DeliveryTimePage } from '../../../../Pages/Pages'

const DeliveryTimeLayout = () => {
       return (
              <>
                     <TitlePage text={'Delivery Time '} />
                     <DeliveryTimePage />
              </>
       )
}

export default DeliveryTimeLayout