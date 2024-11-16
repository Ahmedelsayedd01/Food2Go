import React from 'react'
import { TitlePage } from '../../../Components/Components'
import { AddProductPage } from '../../../Pages/Pages'

const AddProductLayout = () => {
       return (
              <>
                     <TitlePage text={'Add Product'} />
                     <AddProductPage />
              </>
       )
}

export default AddProductLayout