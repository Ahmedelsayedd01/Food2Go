import React from 'react'
import { TitlePage } from '../../../../Components/Components'
import { EditCustomersPage } from '../../../../Pages/Pages'

const EditCustomersLayout = () => {
       return (
              <>
                     <TitlePage text={'Edit Customer'} />
                     <EditCustomersPage />
              </>
       )
}

export default EditCustomersLayout