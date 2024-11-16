import React from 'react'
import { TitlePage } from '../../../Components/Components'
import { EditProductPage } from '../../../Pages/Pages'

const EditProductLayout = () => {
       return (
              <>
                     <TitlePage text={'Edit Product'} />
                     <EditProductPage />
              </>
       )
}

export default EditProductLayout