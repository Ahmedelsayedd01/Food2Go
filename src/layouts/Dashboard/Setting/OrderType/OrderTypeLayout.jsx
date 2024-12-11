import React from 'react'
import { TitlePage } from '../../../../Components/Components'
import { OrderTypePage } from '../../../../Pages/Pages'

const OrderTypeLayout = () => {
       return (
              <>
                     <TitlePage text={'OrderType '} />
                     <OrderTypePage />
              </>
       )
}

export default OrderTypeLayout