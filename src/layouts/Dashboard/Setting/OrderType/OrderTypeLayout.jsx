import React from 'react'
import { TitlePage } from '../../../../Components/Components'
import { OrderTypePage } from '../../../../Pages/Pages'

const OrderTypeLayout = () => {
       return (
              <>
                     <TitlePage text={'Order Type '} />
                     <OrderTypePage />
              </>
       )
}

export default OrderTypeLayout