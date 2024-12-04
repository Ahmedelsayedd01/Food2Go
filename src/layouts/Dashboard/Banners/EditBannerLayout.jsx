import React from 'react'
import { TitlePage } from '../../../Components/Components'
import { EditBannerPage } from '../../../Pages/Pages'

const EditBannerLayout = () => {
       return (
              <>
                     <TitlePage text={'Edit Banner'} />
                     <EditBannerPage />
              </>
       )
}

export default EditBannerLayout