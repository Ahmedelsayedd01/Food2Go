import React from 'react'
import { Outlet } from 'react-router-dom'
import BusinessSetupNav from './BusinessSetupNav'
import { TitlePage } from '../../../Components/Components'

const BusinessSetupLayout = () => {
       return (
              <>
                     <div className="w-full flex flex-col mb-0">
                            <TitlePage text={'Business Setup'} />
                            <BusinessSetupNav />
                            <div className="mt-5">
                                   <Outlet />
                            </div>
                     </div>
              </>
       )
}

export default BusinessSetupLayout