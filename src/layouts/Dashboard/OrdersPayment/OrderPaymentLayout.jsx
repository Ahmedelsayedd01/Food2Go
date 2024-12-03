import React from 'react'
import { Outlet } from 'react-router-dom'
import { TitlePage } from '../../../Components/Components'
import OrdersPaymentNav from './OrdersPaymentNav'

const OrderPaymentLayout = () => {
       return (
              <>
                     <div className="w-full flex flex-col mb-0">
                            <TitlePage text={'Orders Payment'} />
                            <OrdersPaymentNav />
                            <div className="mt-5">
                                   <Outlet />
                            </div>
                     </div>
              </>
       )
}

export default OrderPaymentLayout