import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const BusinessSetupNav = () => {
       const location = useLocation();
       const navigate = useNavigate();
       const [path] = useState(location.pathname)

       const [isActiveBusinessSettings, setIsActiveBusinessSettings] = useState(false)
       const [isActiveMainBranchSetup, setIsActiveMainBranchSetup] = useState(false)
       const [isActiveRestaurantTimeSlot, setIsActiveRestaurantTimeSlot] = useState(false)
       const [isActiveCustomerLogin, setIsActiveCustomerLogin] = useState(false)
       const [isActiveOrders, setIsActiveOrders] = useState(false)
       // const path = location.pathname;
       console.log('locationsss', path)

       const handleAllTap = () => {
              setIsActiveBusinessSettings(false)
              setIsActiveMainBranchSetup(false)
              setIsActiveRestaurantTimeSlot(false)
              setIsActiveCustomerLogin(false)
              setIsActiveOrders(false)
       }


       const handleBusinessSettings = () => {
              handleAllTap()
              setIsActiveBusinessSettings(true)
              navigate('business_settings')
       }
       const handleMainBranchSetup = () => {
              handleAllTap()
              setIsActiveMainBranchSetup(true)
              navigate('main_branch_setup')
       }
       const handleRestaurantTimeSlot = () => {
              handleAllTap()
              setIsActiveRestaurantTimeSlot(true)
              navigate('restaurant_time_slot')
       }
       const handleCustomerLogin = () => {
              handleAllTap()
              setIsActiveCustomerLogin(true)
              navigate('customer_login')
       }
       const handleOrders = () => {
              handleAllTap()
              setIsActiveOrders(true)
              navigate('orders')
       }

       useEffect(() => {

              if (path === '/dashboard/business_setup/business_settings' || path === '/dashboard/business_setup/' || path === '/dashboard/business_setup') {
                     handleBusinessSettings()
              }
              if (path === '/dashboard/business_setup/main_branch_setup') {
                     handleMainBranchSetup()
              }
              if (path === '/dashboard/business_setup/restaurant_time_slot') {
                     handleRestaurantTimeSlot()
              }
              if (path === '/dashboard/business_setup/customer_login') {
                     handleCustomerLogin()
              }
              if (path === '/dashboard/business_setup/orders') {
                     handleOrders()
              }
       }, [])
       return (
              <>
                     <nav className="flex flex-wrap items-center w-full justify-start gap-8">
                            <Link to={"business_settings"} className={isActiveBusinessSettings ? "text-2xl font-TextFontMedium border-b-4 border-mainColor pb-2 text-mainColor" : "text-2xl font-TextFontMedium pb-2 text-gray-500"} onClick={handleBusinessSettings}>Business Settings</Link>
                            <Link to={"main_branch_setup"} className={isActiveMainBranchSetup ? "text-2xl font-TextFontMedium border-b-4 border-mainColor pb-2 text-mainColor" : "text-2xl font-TextFontMedium pb-2 text-gray-500"} onClick={handleMainBranchSetup}>Main Branch Setup</Link>
                            <Link to={"restaurant_time_slot"} className={isActiveRestaurantTimeSlot ? "text-2xl font-TextFontMedium border-b-4 border-mainColor pb-2 text-mainColor" : "text-2xl font-TextFontMedium pb-2 text-gray-500"} onClick={handleRestaurantTimeSlot}>Restaurant Availabilty Time Slot</Link>
                            <Link to={"customer_login"} className={isActiveCustomerLogin ? "text-2xl font-TextFontMedium border-b-4 border-mainColor pb-2 text-mainColor" : "text-2xl font-TextFontMedium pb-2 text-gray-500"} onClick={handleCustomerLogin}>Customer Login</Link>
                            <Link to={"orders"} className={isActiveOrders ? "text-2xl font-TextFontMedium border-b-4 border-mainColor pb-2 text-mainColor" : "text-2xl font-TextFontMedium pb-2 text-gray-500"} onClick={handleOrders}>Orders</Link>
                     </nav>
              </>
       )
}

export default BusinessSetupNav