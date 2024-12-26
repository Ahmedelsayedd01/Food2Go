import React from 'react'
import { HomePage } from '../../../Pages/Pages'
import { TitlePage } from '../../../Components/Components'

const DashboardLayout = () => {
       return (
              <>
                     <TitlePage text={'Dashboard'} />
                     <HomePage />
              </>
       )
}

export default DashboardLayout