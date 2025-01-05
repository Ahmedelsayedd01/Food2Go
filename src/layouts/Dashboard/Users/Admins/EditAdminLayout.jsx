import React from 'react'
import { TitlePage } from '../../../../Components/Components'
import { EditAdminPage } from '../../../../Pages/Pages'

const EditAdminLayout = () => {
       return (
              <>
                     <TitlePage text={'Edit Admin'} />
                     <EditAdminPage />
              </>
       )
}

export default EditAdminLayout