import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const OrdersPaymentNav = () => {
       const location = useLocation();
       const navigate = useNavigate();
       const [path] = useState(location.pathname)
       const [isActiveOrdersPaymentPending, setIsActiveOrdersPaymentPending] = useState(true)
       const [isActiveOrdersPaymentHistory, setIsActiveOrdersPaymentHistory] = useState(false)
       // const path = location.pathname;
       console.log('locationsss', path)

       const handleOrdersPaymentPending = () => {
              setIsActiveOrdersPaymentPending(true)
              setIsActiveOrdersPaymentHistory(false)
              navigate('payment_pending')
       }
       const handleOrdersPaymentHistory = () => {
              setIsActiveOrdersPaymentHistory(true)
              setIsActiveOrdersPaymentPending(false)
              navigate('payment_history')
       }
       useEffect(() => {

              if (path === '/dashboard/orders_payment/payment_pending' || path === '/dashboard/orders_payment/' || path === '/dashboard/orders_payment') {
                     handleOrdersPaymentPending()
              }
              if (path === '/dashboard/orders_payment/payment_history') {
                     handleOrdersPaymentHistory()
              }
       }, [])
       return (
              <>
                     <nav className="flex items-center w-full justify-center gap-8">
                            <Link to={"payment_pending"} className={isActiveOrdersPaymentPending ? "text-2xl font-TextFontMedium border-b-4 border-mainColor pb-2 text-mainColor" : "text-2xl font-TextFontMedium pb-2 text-mainColor"} onClick={handleOrdersPaymentPending}>Pending</Link>
                            <Link to={"payment_history"} className={isActiveOrdersPaymentHistory ? "text-2xl font-TextFontMedium border-b-4 border-mainColor pb-2 text-mainColor" : "text-2xl font-TextFontMedium pb-2 text-mainColor"} onClick={handleOrdersPaymentHistory}>History</Link>
                     </nav>
              </>
       )
}

export default OrdersPaymentNav