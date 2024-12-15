import React from 'react'
import { TitlePage } from '../../../Components/Components'
import { EditDealPage } from '../../../Pages/Pages'

const EditDealLayout = () => {
       return (
              <>
                     <TitlePage text={'Edit Deal'} />
                     <EditDealPage />
              </>
       )
}

export default EditDealLayout